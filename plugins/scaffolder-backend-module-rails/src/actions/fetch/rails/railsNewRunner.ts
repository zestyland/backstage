/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ContainerRunner } from '@backstage/backend-common';
import fs from 'fs-extra';
import path from 'path';
import { runCommand } from '@backstage/plugin-scaffolder-backend';
import commandExists from 'command-exists';
import {
  railsArgumentResolver,
  RailsRunOptions,
} from './railsArgumentResolver';
import { JsonObject } from '@backstage/config';
import { Writable } from 'stream';

export class RailsNewRunner {
  private readonly containerRunner: ContainerRunner;

  constructor({ containerRunner }: { containerRunner: ContainerRunner }) {
    this.containerRunner = containerRunner;
  }

  public async run({
    workspacePath,
    values,
    logStream,
  }: {
    workspacePath: string;
    values: JsonObject;
    logStream: Writable;
  }): Promise<void> {
    const intermediateDir = path.join(workspacePath, 'intermediate');
    await fs.ensureDir(intermediateDir);
    const resultDir = path.join(workspacePath, 'result');

    const { name, imageName, railsArguments } = values;

    // Directories to bind on container
    const mountDirs = {
      [workspacePath]: '/input',
      [intermediateDir]: '/output',
    };

    const baseCommand = 'rails';
    const baseArguments = ['new'];
    const commandExistsToRun = await commandExists(baseCommand);

    if (commandExistsToRun) {
      const arrayExtraArguments = railsArgumentResolver(
        workspacePath,
        railsArguments as RailsRunOptions,
      );

      await runCommand({
        command: baseCommand,
        args: [
          ...baseArguments,
          `${intermediateDir}/${name}`,
          ...arrayExtraArguments,
        ],
        logStream,
      });
    } else {
      const arrayExtraArguments = railsArgumentResolver(
        '/input',
        railsArguments as RailsRunOptions,
      );
      await this.containerRunner.runContainer({
        imageName: imageName as string,
        command: baseCommand,
        args: [...baseArguments, `/output/${name}`, ...arrayExtraArguments],
        mountDirs,
        workingDir: '/input',
        // Set the home directory inside the container as something that applications can
        // write to, otherwise they will just fail trying to write to /
        envVars: { HOME: '/tmp' },
        logStream,
      });
    }

    // if command was successful, intermediateDir should contain
    // exactly one directory.
    const [generated] = await fs.readdir(intermediateDir);

    if (generated === undefined) {
      throw new Error(`No data generated by ${baseCommand}`);
    }

    await fs.move(path.join(intermediateDir, generated), resultDir);
  }
}
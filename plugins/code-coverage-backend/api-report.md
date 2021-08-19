## API Report File for "@backstage/plugin-code-coverage-backend"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { Config } from '@backstage/config';
import express from 'express';
import { Logger as Logger_2 } from 'winston';
import { PluginDatabaseManager } from '@backstage/backend-common';
import { PluginEndpointDiscovery } from '@backstage/backend-common';
import { UrlReader } from '@backstage/backend-common';

// Warning: (ae-missing-release-tag) "CodeCoverageApi" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface CodeCoverageApi {
  // (undocumented)
  name: string;
}

// Warning: (ae-missing-release-tag) "createRouter" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function createRouter(options: RouterOptions): Promise<express.Router>;

// Warning: (ae-missing-release-tag) "makeRouter" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export const makeRouter: (options: RouterOptions) => Promise<express.Router>;

// Warning: (ae-missing-release-tag) "RouterOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface RouterOptions {
  // (undocumented)
  config: Config;
  // (undocumented)
  database: PluginDatabaseManager;
  // (undocumented)
  discovery: PluginEndpointDiscovery;
  // (undocumented)
  logger: Logger_2;
  // (undocumented)
  urlReader: UrlReader;
}

// (No @packageDocumentation comment for this package)
```
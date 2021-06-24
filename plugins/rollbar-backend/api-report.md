## API Report File for "@backstage/plugin-rollbar-backend"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Config } from '@backstage/config';
import express from 'express';
import { Logger } from 'winston';

// @public (undocumented)
export function createRouter(options: RouterOptions): Promise<express.Router>;

// @public (undocumented)
export function getRequestHeaders(token: string): {
    headers: {
        'X-Rollbar-Access-Token': string;
    };
};

// @public (undocumented)
export class RollbarApi {
    constructor(accessToken: string, logger: Logger);
    // (undocumented)
    getActivatedCounts(projectName: string, options?: {
        environment: string;
        item_id?: number;
    }): Promise<RollbarItemCount[]>;
    // (undocumented)
    getAllProjects(): Promise<RollbarProject[]>;
    // (undocumented)
    getOccuranceCounts(projectName: string, options?: {
        environment: string;
        item_id?: number;
    }): Promise<RollbarItemCount[]>;
    // (undocumented)
    getProject(projectName: string): Promise<RollbarProject>;
    // (undocumented)
    getProjectItems(projectName: string): Promise<RollbarItemsResponse>;
    // (undocumented)
    getTopActiveItems(projectName: string, options?: {
        hours: number;
        environment: string;
    }): Promise<RollbarTopActiveItem[]>;
    }

// @public (undocumented)
export interface RouterOptions {
    // (undocumented)
    config: Config;
    // (undocumented)
    logger: Logger;
    // (undocumented)
    rollbarApi?: RollbarApi;
}


// (No @packageDocumentation comment for this package)

```
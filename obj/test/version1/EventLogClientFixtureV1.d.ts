import { IEventLogClientV1 } from '../../src/version1/IEventLogClientV1';
export declare class EventLogClientFixtureV1 {
    private _client;
    constructor(client: IEventLogClientV1);
    testCrudOperations(done: any): void;
}

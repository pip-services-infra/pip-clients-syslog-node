import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-rpc-node';
import { IEventLogClientV1 } from './IEventLogClientV1';
import { SystemEventV1 } from './SystemEventV1';
export declare class EventLogDirectClientV1 extends DirectClient<any> implements IEventLogClientV1 {
    constructor(config?: any);
    getEvents(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SystemEventV1>) => void): void;
    logEvent(correlationId: string, event: SystemEventV1, callback?: (err: any, event: SystemEventV1) => void): void;
}

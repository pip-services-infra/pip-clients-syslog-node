let os = require('os');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableLambdaClient } from 'pip-services-aws-node';

import { SystemEventV1 } from './SystemEventV1';
import { IEventLogClientV1 } from './IEventLogClientV1';

export class EventLogLambdaClientV1 extends CommandableLambdaClient implements IEventLogClientV1 {

    constructor(config?: any) {
        super('eventlog');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public getEvents(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<SystemEventV1>) => void) {
        this.callCommand(
            'get_events',
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public logEvent(correlationId: string, event: SystemEventV1,
        callback?: (err: any, event: SystemEventV1) => void) {

        event.time = event.time || new Date();
        event.source = event.source || os.hostname(); 

        this.callCommand(
            'log_event',
            correlationId,
            {
                event: event
            }, 
            callback
        );
    }
    
}

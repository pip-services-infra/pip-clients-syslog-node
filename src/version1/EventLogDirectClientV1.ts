import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';

import { IEventLogClientV1 } from './IEventLogClientV1';
//import { IEventLogController } from 'pip-services-eventlog-node';
import { SystemEventV1 } from './SystemEventV1';

export class EventLogDirectClientV1 extends DirectClient<any> implements IEventLogClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-eventlog", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getEvents(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<SystemEventV1>) => void): void {
        let timing = this.instrument(correlationId, 'eventlog.get_events');
        this._controller.getEvents(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public logEvent(correlationId: string, event: SystemEventV1, 
        callback?: (err: any, event: SystemEventV1) => void): void {
        let timing = this.instrument(correlationId, 'eventlog.log_event');
        this._controller.logEvent(correlationId, event, (err, event) => {
            timing.endTiming();
            if (callback) callback(err, event);
        });
    }

}
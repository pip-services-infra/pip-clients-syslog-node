import { IStringIdentifiable } from 'pip-services-commons-node';
import { StringValueMap } from 'pip-services-commons-node';
import { EventLogSeverityV1 } from './EventLogSeverityV1';
export declare class SystemEventV1 implements IStringIdentifiable {
    constructor(correlationId: string, source: string, type: string, severity: EventLogSeverityV1, message: string, details?: StringValueMap);
    id: string;
    time: Date;
    correlationId: string;
    source: string;
    type: string;
    severity: EventLogSeverityV1;
    message: string;
    details: StringValueMap;
}
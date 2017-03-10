import { IClient } from 'pip-services-runtime-node';

/**
 * Interface for Syslog microservice clients version 1
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-25
 */
export interface ISystemLogClient extends IClient {
    getSystemActivities(correlationId: string, filter: any, paging: any, callback: any): void;
    logSystemActivity(correlationId: string, activity: any, callback: any): void;
}

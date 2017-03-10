declare module 'pip-clients-syslog-node' {
	import { IClient } from 'pip-services-runtime-node';
	import { RestClient } from 'pip-services-runtime-node';
	import { LambdaClient } from 'pip-services-runtime-node';
	import { SenecaClient } from 'pip-services-runtime-node';
	import { AbstractClient } from 'pip-services-runtime-node';
	import { ComponentDescriptor } from 'pip-services-runtime-node';
	import { ComponentFactory } from 'pip-services-runtime-node';

    export class SystemLogFactory extends ComponentFactory {
        public static Instance: SystemLogFactory;	
        constructor();	
    }

    module Version1 {
        export interface ISystemLogClient extends IClient {
            getSystemActivities(correlationId: string, filter: any, paging: any, callback: any): void;
            logSystemActivity(correlationId: string, activity: any, callback: any): void;
        }

        export class SystemLogRestClient extends RestClient implements ISystemLogClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getSystemActivities(correlationId: string, filter: any, paging: any, callback: any): void;
            logSystemActivity(correlationId: string, activity: any, callback: any): void;
        }

        export class SystemLogLambdaClient extends LambdaClient implements ISystemLogClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getSystemActivities(correlationId: string, filter: any, paging: any, callback: any): void;
            logSystemActivity(correlationId: string, activity: any, callback: any): void;
        }

        export class SystemLogSenecaClient extends SenecaClient implements ISystemLogClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getSystemActivities(correlationId: string, filter: any, paging: any, callback: any): void;
            logSystemActivity(correlationId: string, activity: any, callback: any): void;
        }

        export class SystemLogNullClient extends AbstractClient implements ISystemLogClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getSystemActivities(correlationId: string, filter: any, paging: any, callback: any): void;
            logSystemActivity(correlationId: string, activity: any, callback: any): void;
        }
    }
}

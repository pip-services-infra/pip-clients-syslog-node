let _ = require('lodash');
let os = require('os');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { SenecaClient } from 'pip-services-runtime-node';

import { ISystemLogClient } from './ISystemLogClient';

export class SystemLogSenecaClient extends SenecaClient implements ISystemLogClient {       
	/**
	 * Unique descriptor for the SystemLogSenecaClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-syslog", "seneca", "1.0"
	);
    
    constructor(config?: any) {
        super(SystemLogSenecaClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
        
    public getSystemActivities(correlationId: string, filter: any, paging: any, callback) {
        callback = this.instrument(correlationId, 'syslog.get_system_activities', callback);
        
        this.call(
            'syslog', 'get_system_activities', 
            {
                correlation_id: correlationId,
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public logSystemActivity(correlationId: string, activity: any, callback) {
        callback = this.instrument(correlationId, 'syslog.log_system_activity', callback);

        activity.time = activity.time || new Date();
        activity.server = activity.server || os.hostname(); 

        this.call(
            'syslog', 'log_system_activity', 
            {
                correlation_id: correlationId,
                activity: activity
            }, 
            callback
        );
    }
    
}

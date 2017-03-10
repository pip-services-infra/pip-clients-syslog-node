let _ = require('lodash');
let os = require('os');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { RestClient } from 'pip-services-runtime-node';

import { ISystemLogClient } from './ISystemLogClient';

export class SystemLogRestClient extends RestClient implements ISystemLogClient {       
	/**
	 * Unique descriptor for the SystemLogRestClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-syslog", "rest", "1.0"
	);
    
    constructor(config?: any) {
        super(SystemLogRestClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
        
    public getSystemActivities(correlationId: string, filter: any, paging: any, callback) {
        callback = this.instrument(correlationId, 'syslog.get_system_activities', callback);
        
        let params = {};
        this.addCorrelationId(params, correlationId);
        this.addFilterParams(params, filter);
        this.addPagingParams(params, paging);
        
        this.call('get', 
            '/syslog', 
            params, 
            callback
        );
    };

    public logSystemActivity(correlationId: string, activity, callback) {
        callback = this.instrument(correlationId, 'syslog.log_system_activity', callback);
        
        activity.time = activity.time || new Date();
        activity.server = activity.server || os.hostname(); 
        
        this.call('post', 
            '/syslog',
            {
                correlation_id: correlationId
            }, 
            activity, 
            callback
        );
    };

}

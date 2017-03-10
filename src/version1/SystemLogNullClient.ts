import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { AbstractClient } from 'pip-services-runtime-node';

import { ISystemLogClient } from './ISystemLogClient';

export class SystemLogNullClient extends AbstractClient implements ISystemLogClient {       
	/**
	 * Unique descriptor for the SystemLogNullClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-syslog", "null", "1.0"
	);
    
    constructor(config?: any) {
        super(SystemLogNullClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
        
    public getSystemActivities(correlationId: string, filter: any, paging: any, callback) {
        if (callback) callback(null, []);
    }

    public logSystemActivity(correlationId: string, activity: any, callback) {
        if (callback) callback(null, null);
    }    
}

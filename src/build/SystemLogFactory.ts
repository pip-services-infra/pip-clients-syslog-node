import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

let Version1 = require('../version1');

export class SystemLogFactory extends ComponentFactory {
	public static Instance: SystemLogFactory = new SystemLogFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(Version1.SystemLogNullClient.Descriptor, Version1.SystemLogNullClient);
		this.register(Version1.SystemLogRestClient.Descriptor, Version1.SystemLogRestClient);
		this.register(Version1.SystemLogSenecaClient.Descriptor, Version1.SystemLogSenecaClient);
		this.register(Version1.SystemLogLambdaClient.Descriptor, Version1.SystemLogLambdaClient);
	}
	
}

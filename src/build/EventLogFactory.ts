import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

import { EventLogNullClientV1 } from '../version1/EventLogNullClientV1';
import { EventLogDirectClientV1 } from '../version1/EventLogDirectClientV1';
import { EventLogRestClientV1 } from '../version1/EventLogRestClientV1';
import { EventLogSenecaClientV1 } from '../version1/EventLogSenecaClientV1';

export class EventLogFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-eventlog', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-eventlog', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-eventlog', 'client', 'direct', 'default', '1.0');
	public static RestClientV1Descriptor = new Descriptor('pip-services-eventlog', 'client', 'rest', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-eventlog', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(EventLogFactory.NullClientV1Descriptor, EventLogNullClientV1);
		this.registerAsType(EventLogFactory.DirectClientV1Descriptor, EventLogDirectClientV1);
		this.registerAsType(EventLogFactory.RestClientV1Descriptor, EventLogRestClientV1);
		this.registerAsType(EventLogFactory.SenecaClientV1Descriptor, EventLogSenecaClientV1);
	}
	
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const EventLogNullClientV1_1 = require("../version1/EventLogNullClientV1");
const EventLogDirectClientV1_1 = require("../version1/EventLogDirectClientV1");
const EventLogRestClientV1_1 = require("../version1/EventLogRestClientV1");
const EventLogSenecaClientV1_1 = require("../version1/EventLogSenecaClientV1");
class EventLogFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(EventLogFactory.NullClientV1Descriptor, EventLogNullClientV1_1.EventLogNullClientV1);
        this.registerAsType(EventLogFactory.DirectClientV1Descriptor, EventLogDirectClientV1_1.EventLogDirectClientV1);
        this.registerAsType(EventLogFactory.RestClientV1Descriptor, EventLogRestClientV1_1.EventLogRestClientV1);
        this.registerAsType(EventLogFactory.SenecaClientV1Descriptor, EventLogSenecaClientV1_1.EventLogSenecaClientV1);
    }
}
EventLogFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'factory', 'default', 'default', '1.0');
EventLogFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'client', 'null', 'default', '1.0');
EventLogFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'client', 'direct', 'default', '1.0');
EventLogFactory.RestClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'client', 'rest', 'default', '1.0');
EventLogFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'client', 'seneca', 'default', '1.0');
exports.EventLogFactory = EventLogFactory;
//# sourceMappingURL=EventLogFactory.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const EventLogNullClientV1_1 = require("../version1/EventLogNullClientV1");
const EventLogDirectClientV1_1 = require("../version1/EventLogDirectClientV1");
const EventLogHttpClientV1_1 = require("../version1/EventLogHttpClientV1");
const EventLogSenecaClientV1_1 = require("../version1/EventLogSenecaClientV1");
class EventLogClientFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(EventLogClientFactory.NullClientV1Descriptor, EventLogNullClientV1_1.EventLogNullClientV1);
        this.registerAsType(EventLogClientFactory.DirectClientV1Descriptor, EventLogDirectClientV1_1.EventLogDirectClientV1);
        this.registerAsType(EventLogClientFactory.HttpClientV1Descriptor, EventLogHttpClientV1_1.EventLogHttpClientV1);
        this.registerAsType(EventLogClientFactory.SenecaClientV1Descriptor, EventLogSenecaClientV1_1.EventLogSenecaClientV1);
    }
}
EventLogClientFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'factory', 'default', 'default', '1.0');
EventLogClientFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'client', 'null', 'default', '1.0');
EventLogClientFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'client', 'direct', 'default', '1.0');
EventLogClientFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'client', 'http', 'default', '1.0');
EventLogClientFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'client', 'seneca', 'default', '1.0');
exports.EventLogClientFactory = EventLogClientFactory;
//# sourceMappingURL=EventLogClientFactory.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class EventLogHttpClientV1 extends pip_services_rpc_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/eventlog');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getEvents(correlationId, filter, paging, callback) {
        this.callCommand('get_events', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    logEvent(correlationId, event, callback) {
        event.time = event.time || new Date();
        event.source = event.source || os.hostname();
        this.callCommand('log_event', correlationId, {
            event: event
        }, callback);
    }
}
exports.EventLogHttpClientV1 = EventLogHttpClientV1;
//# sourceMappingURL=EventLogHttpClientV1.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class EventLogSenecaClientV1 extends pip_services_net_node_1.CommandableSenecaClient {
    constructor(config) {
        super('eventlog');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getEventsPageByFilter(correlationId, filter, paging, callback) {
        this.callCommand('get_events_page_by_filter', correlationId, {
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
exports.EventLogSenecaClientV1 = EventLogSenecaClientV1;
//# sourceMappingURL=EventLogSenecaClientV1.js.map
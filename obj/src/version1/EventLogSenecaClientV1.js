"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class EventLogSenecaClientV1 extends pip_services_seneca_node_1.CommandableSenecaClient {
    constructor(config) {
        super('eventlog');
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
exports.EventLogSenecaClientV1 = EventLogSenecaClientV1;
//# sourceMappingURL=EventLogSenecaClientV1.js.map
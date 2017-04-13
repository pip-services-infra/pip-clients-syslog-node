"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
class EventLogLambdaClientV1 extends pip_services_aws_node_1.CommandableLambdaClient {
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
exports.EventLogLambdaClientV1 = EventLogLambdaClientV1;
//# sourceMappingURL=EventLogLambdaClientV1.js.map
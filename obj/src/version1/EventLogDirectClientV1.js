"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class EventLogDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-eventlog", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getEvents(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'eventlog.get_events');
        this._controller.getEvents(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    logEvent(correlationId, event, callback) {
        let timing = this.instrument(correlationId, 'eventlog.log_event');
        this._controller.logEvent(correlationId, event, (err, event) => {
            timing.endTiming();
            if (callback)
                callback(err, event);
        });
    }
}
exports.EventLogDirectClientV1 = EventLogDirectClientV1;
//# sourceMappingURL=EventLogDirectClientV1.js.map
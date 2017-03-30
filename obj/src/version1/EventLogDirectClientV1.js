"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class EventLogDirectClientV1 extends pip_services_net_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor("pip-services-eventlog", "controller", "*", "*", "*"));
    }
    getEventsPageByFilter(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'eventlog.get_events_page_by_filter');
        this._controller.getEventsPageByFilter(correlationId, filter, paging, (err, page) => {
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
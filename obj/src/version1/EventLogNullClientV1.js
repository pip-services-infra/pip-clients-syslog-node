"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
class EventLogNullClientV1 {
    constructor(config) { }
    getEvents(correlationId, filter, paging, callback) {
        callback(null, new pip_services_commons_node_1.DataPage([], 0));
    }
    logEvent(correlationId, event, callback) {
        if (callback)
            callback(null, event);
    }
}
exports.EventLogNullClientV1 = EventLogNullClientV1;
//# sourceMappingURL=EventLogNullClientV1.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
const SystemEventV1_1 = require("../../src/version1/SystemEventV1");
const EventLogTypeV1_1 = require("../../src/version1/EventLogTypeV1");
const EventLogSeverityV1_1 = require("../../src/version1/EventLogSeverityV1");
let EVENT1 = new SystemEventV1_1.SystemEventV1(null, 'test', EventLogTypeV1_1.EventLogTypeV1.Restart, EventLogSeverityV1_1.EventLogSeverityV1.Important, 'test restart #1');
let EVENT2 = new SystemEventV1_1.SystemEventV1(null, 'test', EventLogTypeV1_1.EventLogTypeV1.Failure, EventLogSeverityV1_1.EventLogSeverityV1.Critical, 'test error');
class EventLogClientFixtureV1 {
    constructor(client) {
        this._client = client;
    }
    testCrudOperations(done) {
        let event1;
        let event2;
        async.series([
            // Create one event
            (callback) => {
                this._client.logEvent(null, EVENT1, (err, event) => {
                    assert.isNull(err);
                    assert.isObject(event);
                    assert.isNotNull(event.time);
                    assert.isNotNull(event.source);
                    assert.equal(event.type, EVENT1.type);
                    assert.equal(event.message, EVENT1.message);
                    event1 = event;
                    callback();
                });
            },
            // Create another event
            (callback) => {
                this._client.logEvent(null, EVENT2, (err, event) => {
                    assert.isNull(err);
                    assert.isObject(event);
                    assert.isNotNull(event.time);
                    assert.isNotNull(event.source);
                    assert.equal(event.type, EVENT2.type);
                    assert.equal(event.message, EVENT2.message);
                    event2 = event;
                    callback();
                });
            },
            // Get all system events
            (callback) => {
                this._client.getEvents(null, null, null, (err, page) => {
                    assert.isNull(err);
                    assert.isObject(page);
                    assert.lengthOf(page.data, 2);
                    callback();
                });
            }
        ], done);
    }
}
exports.EventLogClientFixtureV1 = EventLogClientFixtureV1;
//# sourceMappingURL=EventLogClientFixtureV1.js.map
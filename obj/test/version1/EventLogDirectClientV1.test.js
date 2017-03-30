"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let assert = require('chai').assert;
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_eventlog_node_1 = require("pip-services-eventlog-node");
const pip_services_eventlog_node_2 = require("pip-services-eventlog-node");
const EventLogDirectClientV1_1 = require("../../src/version1/EventLogDirectClientV1");
const EventLogClientFixtureV1_1 = require("./EventLogClientFixtureV1");
suite('EventLogDirectClientV1', () => {
    let client;
    let fixture;
    suiteSetup((done) => {
        let logger = new pip_services_commons_node_3.ConsoleLogger();
        let persistence = new pip_services_eventlog_node_1.EventLogMemoryPersistence();
        let controller = new pip_services_eventlog_node_2.EventLogController();
        let references = pip_services_commons_node_2.References.fromTuples(new pip_services_commons_node_1.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'controller', 'default', 'default', '1.0'), controller);
        controller.setReferences(references);
        client = new EventLogDirectClientV1_1.EventLogDirectClientV1();
        client.setReferences(references);
        fixture = new EventLogClientFixtureV1_1.EventLogClientFixtureV1(client);
        client.open(null, done);
    });
    suiteTeardown((done) => {
        client.close(null, done);
    });
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});
//# sourceMappingURL=EventLogDirectClientV1.test.js.map
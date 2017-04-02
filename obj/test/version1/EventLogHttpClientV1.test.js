"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let assert = require('chai').assert;
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_eventlog_node_1 = require("pip-services-eventlog-node");
const pip_services_eventlog_node_2 = require("pip-services-eventlog-node");
const pip_services_eventlog_node_3 = require("pip-services-eventlog-node");
const EventLogHttpClientV1_1 = require("../../src/version1/EventLogHttpClientV1");
const EventLogClientFixtureV1_1 = require("./EventLogClientFixtureV1");
var httpConfig = pip_services_commons_node_2.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000);
suite('EventLogHttpClientV1', () => {
    let service;
    let client;
    let fixture;
    suiteSetup((done) => {
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let persistence = new pip_services_eventlog_node_1.EventLogMemoryPersistence();
        let controller = new pip_services_eventlog_node_2.EventLogController();
        service = new pip_services_eventlog_node_3.EventLogHttpServiceV1();
        service.configure(httpConfig);
        let references = pip_services_commons_node_3.References.fromTuples(new pip_services_commons_node_1.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'service', 'http', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        client = new EventLogHttpClientV1_1.EventLogHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);
        fixture = new EventLogClientFixtureV1_1.EventLogClientFixtureV1(client);
        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});
//# sourceMappingURL=EventLogHttpClientV1.test.js.map
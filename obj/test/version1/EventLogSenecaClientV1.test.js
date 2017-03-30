"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let assert = require('chai').assert;
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_eventlog_node_1 = require("pip-services-eventlog-node");
const pip_services_eventlog_node_2 = require("pip-services-eventlog-node");
const pip_services_eventlog_node_3 = require("pip-services-eventlog-node");
const EventLogSenecaClientV1_1 = require("../../src/version1/EventLogSenecaClientV1");
const EventLogClientFixtureV1_1 = require("./EventLogClientFixtureV1");
let senecaConfig = pip_services_commons_node_2.ConfigParams.fromTuples("connection.protocol", "none");
suite('EventLogSenecaClient', () => {
    let service;
    let client;
    let fixture;
    suiteSetup((done) => {
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let persistence = new pip_services_eventlog_node_1.EventLogMemoryPersistence();
        let controller = new pip_services_eventlog_node_2.EventLogController();
        service = new pip_services_eventlog_node_3.EventLogSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new pip_services_net_node_1.SenecaInstance();
        let references = pip_services_commons_node_3.References.fromTuples(new pip_services_commons_node_1.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_1.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca, new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_1.Descriptor('pip-services-eventlog', 'service', 'seneca', 'default', '1.0'), service);
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);
        client = new EventLogSenecaClientV1_1.EventLogSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);
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
//# sourceMappingURL=EventLogSenecaClientV1.test.js.map
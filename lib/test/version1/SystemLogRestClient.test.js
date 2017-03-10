"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var SystemLogMemoryPersistence = require('pip-services-syslog/lib/src/persistence/SystemLogMemoryPersistence').SystemLogMemoryPersistence;
var SystemLogController = require('pip-services-syslog/lib/src/logic/SystemLogController').SystemLogController;
var SystemLogRestService = require('pip-services-syslog/lib/src/services/version1/SystemLogRestService').SystemLogRestService;
var SystemLogRestClient_1 = require('../../src/version1/SystemLogRestClient');
var SystemLogClientFixture_1 = require('./SystemLogClientFixture');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.protocol', 'http', 'endpoint.host', 'localhost', 'endpoint.port', 3000);
suite('SystemLogRestClient', function () {
    var db = new SystemLogMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new SystemLogController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new SystemLogRestService();
    service.configure(restConfig);
    var client = new SystemLogRestClient_1.SystemLogRestClient();
    client.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, client, service);
    var fixture = new SystemLogClientFixture_1.SystemLogClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});

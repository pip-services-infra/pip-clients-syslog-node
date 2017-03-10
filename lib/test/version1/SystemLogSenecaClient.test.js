"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var SystemLogMemoryPersistence = require('pip-services-syslog/lib/src/persistence/SystemLogMemoryPersistence').SystemLogMemoryPersistence;
var SystemLogController = require('pip-services-syslog/lib/src/logic/SystemLogController').SystemLogController;
var SystemLogSenecaService = require('pip-services-syslog/lib/src/services/version1/SystemLogSenecaService').SystemLogSenecaService;
var SystemLogSenecaClient_1 = require('../../src/version1/SystemLogSenecaClient');
var SystemLogClientFixture_1 = require('./SystemLogClientFixture');
var testFw = require('pip-services-test-node');
var assert = testFw.assert;
suite('SystemLogSenecaClient', function () {
    var db = new SystemLogMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new SystemLogController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new SystemLogSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var client = new SystemLogSenecaClient_1.SystemLogSenecaClient();
    client.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_4.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, client, service, seneca);
    var fixture = new SystemLogClientFixture_1.SystemLogClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_3.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});

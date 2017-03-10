let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';

let SystemLogMemoryPersistence = require('pip-services-syslog/lib/src/persistence/SystemLogMemoryPersistence').SystemLogMemoryPersistence;
let SystemLogController = require('pip-services-syslog/lib/src/logic/SystemLogController').SystemLogController;
let SystemLogSenecaService = require('pip-services-syslog/lib/src/services/version1/SystemLogSenecaService').SystemLogSenecaService;

import { SystemLogSenecaClient } from '../../src/version1/SystemLogSenecaClient';
import { SystemLogClientFixture } from './SystemLogClientFixture';

var testFw = require('pip-services-test-node');
var assert = testFw.assert;

suite('SystemLogSenecaClient', ()=> {        
    let db = new SystemLogMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new SystemLogController();
    ctrl.configure(new ComponentConfig());

    let service = new SystemLogSenecaService();
    service.configure(new ComponentConfig());

    let client = new SystemLogSenecaClient(); 
    client.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, client, service, seneca);
    let fixture = new SystemLogClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});
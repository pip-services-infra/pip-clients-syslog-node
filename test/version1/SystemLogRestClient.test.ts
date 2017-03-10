let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

let SystemLogMemoryPersistence = require('pip-services-syslog/lib/src/persistence/SystemLogMemoryPersistence').SystemLogMemoryPersistence;
let SystemLogController = require('pip-services-syslog/lib/src/logic/SystemLogController').SystemLogController;
let SystemLogRestService = require('pip-services-syslog/lib/src/services/version1/SystemLogRestService').SystemLogRestService;

import { SystemLogRestClient } from '../../src/version1/SystemLogRestClient';
import { SystemLogClientFixture } from './SystemLogClientFixture';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.protocol', 'http',
    'endpoint.host', 'localhost',
    'endpoint.port', 3000
);

suite('SystemLogRestClient', ()=> {    
    let db = new SystemLogMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new SystemLogController();
    ctrl.configure(new ComponentConfig());

    let service = new SystemLogRestService();
    service.configure(restConfig);

    let client = new SystemLogRestClient();
    client.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, client, service);
    let fixture = new SystemLogClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});
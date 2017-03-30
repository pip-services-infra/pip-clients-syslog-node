let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { EventLogMemoryPersistence } from 'pip-services-eventlog-node';
import { EventLogController } from 'pip-services-eventlog-node';
import { EventLogRestServiceV1 } from 'pip-services-eventlog-node';
import { IEventLogClientV1 } from '../../src/version1/IEventLogClientV1';
import { EventLogRestClientV1 } from '../../src/version1/EventLogRestClientV1';
import { EventLogClientFixtureV1 } from './EventLogClientFixtureV1';

var restConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('EventLogRestClientV1', ()=> {
    let service: EventLogRestServiceV1;
    let client: EventLogRestClientV1;
    let fixture: EventLogClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new EventLogMemoryPersistence();
        let controller = new EventLogController();

        service = new EventLogRestServiceV1();
        service.configure(restConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-eventlog', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-eventlog', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-eventlog', 'service', 'rest', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new EventLogRestClientV1();
        client.setReferences(references);
        client.configure(restConfig);

        fixture = new EventLogClientFixtureV1(client);

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

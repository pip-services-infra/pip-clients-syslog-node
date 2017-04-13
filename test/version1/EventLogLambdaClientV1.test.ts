import { YamlConfigReader } from 'pip-services-commons-node';
import { EventLogClientFixtureV1 } from './EventLogClientFixtureV1';
import { EventLogLambdaClientV1 } from '../../src/version1/EventLogLambdaClientV1';

suite('EventLogLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: EventLogLambdaClientV1;
    let fixture: EventLogClientFixtureV1;

    setup((done) => {
        client = new EventLogLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new EventLogClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
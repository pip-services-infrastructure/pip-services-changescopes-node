import { YamlConfigReader } from 'pip-services-commons-node';

import { ChangeScopesMongoDbPersistence } from '../../src/persistence/ChangeScopesMongoDbPersistence';
import { ChangeScopesPersistenceFixture } from './ChangeScopesPersistenceFixture';

suite('ChangeScopesMongoDbPersistence', ()=> {
    let persistence: ChangeScopesMongoDbPersistence;
    let fixture: ChangeScopesPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new ChangeScopesMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new ChangeScopesPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('Get and change', (done) => {
        fixture.testGetAndChange(done);
    });

});
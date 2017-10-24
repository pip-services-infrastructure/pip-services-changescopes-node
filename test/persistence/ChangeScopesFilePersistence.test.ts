import { ConfigParams } from 'pip-services-commons-node';

import { ChangeScopesFilePersistence } from '../../src/persistence/ChangeScopesFilePersistence';
import { ChangeScopesPersistenceFixture } from './ChangeScopesPersistenceFixture';

suite('ChangeScopesFilePersistence', ()=> {
    let persistence: ChangeScopesFilePersistence;
    let fixture: ChangeScopesPersistenceFixture;
    
    setup((done) => {
        persistence = new ChangeScopesFilePersistence('./data/change_scopes.test.json');

        fixture = new ChangeScopesPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('Get and change', (done) => {
        fixture.testGetAndChange(done);
    });

});
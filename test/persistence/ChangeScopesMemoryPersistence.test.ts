import { ChangeScopesMemoryPersistence } from '../../src/persistence/ChangeScopesMemoryPersistence';
import { ChangeScopesPersistenceFixture } from './ChangeScopesPersistenceFixture';

suite('ChangeScopesMemoryPersistence', ()=> {
    let persistence: ChangeScopesMemoryPersistence;
    let fixture: ChangeScopesPersistenceFixture;
    
    setup((done) => {
        persistence = new ChangeScopesMemoryPersistence();
        fixture = new ChangeScopesPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('Get and change', (done) => {
        fixture.testGetAndChange(done);
    });

});
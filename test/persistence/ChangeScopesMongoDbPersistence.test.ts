let process = require('process');

import { ConfigParams } from 'pip-services-commons-node';

import { ChangeScopesMongoDbPersistence } from '../../src/persistence/ChangeScopesMongoDbPersistence';
import { ChangeScopesPersistenceFixture } from './ChangeScopesPersistenceFixture';

suite('ChangeScopesMongoDbPersistence', ()=> {
    let persistence: ChangeScopesMongoDbPersistence;
    let fixture: ChangeScopesPersistenceFixture;

    setup((done) => {
        var MONGO_DB = process.env["MONGO_DB"] || "test";
        var MONGO_COLLECTION = process.env["MONGO_COLLECTION"] || "changescopes";
        var MONGO_SERVICE_HOST = process.env["MONGO_SERVICE_HOST"] || "localhost";
        var MONGO_SERVICE_PORT = process.env["MONGO_SERVICE_PORT"] || "27017";
        var MONGO_SERVICE_URI = process.env["MONGO_SERVICE_URI"];

        var dbConfig = ConfigParams.fromTuples(
            "collection", MONGO_COLLECTION,
            "connection.database", MONGO_DB,
            "connection.host", MONGO_SERVICE_HOST,
            "connection.port", MONGO_SERVICE_PORT,
            "connection.uri", MONGO_SERVICE_URI
        );

        persistence = new ChangeScopesMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new ChangeScopesPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            if (err == null) {
                persistence.clear(null, (err) => {
                    done(err);
                });
            } else {
                done(err);
            }
        });
    });
    teardown((done) => {
        persistence.close(null, done);
    });

    test('Get and change', (done) => {
        fixture.testGetAndChange(done);
    });

});
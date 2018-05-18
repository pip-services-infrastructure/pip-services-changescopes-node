let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { ChangeScopeV1 } from '../../../src/data/version1/ChangeScopeV1';
import { ChangeScopesMemoryPersistence } from '../../../src/persistence/ChangeScopesMemoryPersistence';
import { ChangeScopesController } from '../../../src/logic/ChangeScopesController';
import { ChangeScopesHttpServiceV1 } from '../../../src/services/version1/ChangeScopesHttpServiceV1';

let restConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('ChangeScopesHttpServiceV1', ()=> {
    let service: ChangeScopesHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new ChangeScopesMemoryPersistence();
        let controller = new ChangeScopesController();

        service = new ChangeScopesHttpServiceV1();
        service.configure(restConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-changescopes', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-changescopes', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-changescopes', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });

   
    test('Get and Change', (done) => {
        async.series([
            (callback) => {
                rest.post('/v1/change_scopes/change_scope',
                    {
                        id: '123'
                    },
                    (err, req, res, scope) => {
                        assert.isNull(err);
                        
                        assert.isObject(scope);
                        assert.equal('123', scope.id);
                        assert.isEmpty(scope.elements);

                        callback();
                    }
                );
            },
            (callback) => {
                rest.post('/v1/change_scopes/change_scope_element',
                    {
                        id: '123',
                        element: 'key1'
                    },
                    (err, req, res, scope) => {
                        assert.isNull(err);
                        
                        assert.isObject(scope);
                        assert.equal('123', scope.id);
                        assert.hasAllKeys(scope.elements, ['key1']);

                        callback();
                    }
                );
            },
            (callback) => {
                rest.post('/v1/change_scopes/change_scope_element',
                    {
                        id: '123',
                        element: 'key2'
                    },
                    (err, req, res, scope) => {
                        assert.isNull(err);
                        
                        assert.isObject(scope);
                        assert.equal('123', scope.id);
                        assert.hasAllKeys(scope.elements, ['key1', 'key2']);
                        
                        callback();
                    }
                );
            },
            (callback) => {
                rest.post('/v1/change_scopes/delete_scope_by_id',
                    {
                        id: '123'
                    },
                    (err, req, res, scope) => {
                        assert.isNull(err);
                        
                        assert.isObject(scope);
                        assert.equal('123', scope.id);

                        callback();
                    }
                );
            },
            (callback) => {
                rest.post('/v1/change_scopes/get_scope_by_id',
                    {
                        id: '123'
                    },
                    (err, req, res, scope) => {
                        assert.isNull(err);
                        
                        assert.isObject(scope);
                        assert.equal('123', scope.id);

                        callback();
                    }
                );
            }
        ], done);
    });

});
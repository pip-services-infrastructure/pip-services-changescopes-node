let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { ChangeScopeV1 } from '../../../src/data/version1/ChangeScopeV1';
import { ChangeScopesMemoryPersistence } from '../../../src/persistence/ChangeScopesMemoryPersistence';
import { ChangeScopesController } from '../../../src/logic/ChangeScopesController';
import { ChangeScopesSenecaServiceV1 } from '../../../src/services/version1/ChangeScopesSenecaServiceV1';

suite('ChangeScopesSenecaServiceV1', ()=> {
    let seneca: any;
    let service: ChangeScopesSenecaServiceV1;
    let persistence: ChangeScopesMemoryPersistence;
    let controller: ChangeScopesController;

    suiteSetup((done) => {
        persistence = new ChangeScopesMemoryPersistence();
        controller = new ChangeScopesController();

        service = new ChangeScopesSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-changescopes', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-changescopes', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-changescopes', 'service', 'commandable-seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('Get and Change', (done) => {
        async.series([
            (callback) => {
                seneca.act(
                    {
                        role: 'change_scopes',
                        cmd: 'change_scope',
                        id: '123'
                    },
                    (err, scope) => {
                        assert.isNull(err);
                        
                        assert.isObject(scope);
                        assert.equal('123', scope.id);
                        assert.isEmpty(scope.elements);

                        callback();
                    }
                );
            },
            (callback) => {
                seneca.act(
                    {
                        role: 'change_scopes',
                        cmd: 'change_scope_element',
                        id: '123',
                        element: 'key1'
                    },
                    (err, scope) => {
                        assert.isNull(err);
                        
                        assert.isObject(scope);
                        assert.equal('123', scope.id);
                        assert.hasAllKeys(scope.elements, ['key1']);

                        callback();
                    }
                );
            },
            (callback) => {
                seneca.act(
                    {
                        role: 'change_scopes',
                        cmd: 'change_scope_element',
                        id: '123',
                        element: 'key2'
                    },
                    (err, scope) => {
                        assert.isNull(err);
                        
                        assert.isObject(scope);
                        assert.equal('123', scope.id);
                        assert.hasAllKeys(scope.elements, ['key1', 'key2']);
                        
                        callback();
                    }
                );
            },
            (callback) => {
                seneca.act(
                    {
                        role: 'change_scopes',
                        cmd: 'delete_scope_by_id',
                        id: '123'
                    },
                    (err, scope) => {
                        assert.isNull(err);
                        
                        assert.isObject(scope);
                        assert.equal('123', scope.id);

                        callback();
                    }
                );
            },
            (callback) => {
                seneca.act(
                    {
                        role: 'change_scopes',
                        cmd: 'get_scope_by_id',
                        id: '123'
                    },
                    (err, scope) => {
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
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { ChangeScopeV1 } from '../../src/data/version1/ChangeScopeV1';
import { ChangeScopesMemoryPersistence } from '../../src/persistence/ChangeScopesMemoryPersistence';
import { ChangeScopesController } from '../../src/logic/ChangeScopesController';
import { ChangeScopesLambdaFunction } from '../../src/container/ChangeScopesLambdaFunction';

suite('ChangeScopesLambdaFunction', ()=> {
    let lambda: ChangeScopesLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-changescopes:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-changescopes:controller:default:default:1.0'
        );

        lambda = new ChangeScopesLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('Get and Change', (done) => {
        async.series([
            (callback) => {
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
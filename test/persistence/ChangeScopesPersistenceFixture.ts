let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';

import { ChangeScopeV1 } from '../../src/data/version1/ChangeScopeV1';
import { IChangeScopesPersistence } from '../../src/persistence/IChangeScopesPersistence';

export class ChangeScopesPersistenceFixture {
    private _persistence: IChangeScopesPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public testGetAndChange(done) {
        async.series([
            (callback) => {
                this._persistence.change(
                    null,
                    '123',
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
                this._persistence.changeElement(
                    null,
                    '123', 'key1',
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
                this._persistence.changeElement(
                    null,
                    '123', 'key2',
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
                this._persistence.deleteById(
                    null,
                    '123',
                    (err, scope) => {
                        assert.isNull(err);
                        
                        assert.isObject(scope);
                        assert.equal('123', scope.id);

                        callback();
                    }
                );
            },
            (callback) => {
                this._persistence.getOneById(
                    null,
                    '123',
                    (err, scope) => {
                        assert.isNull(err);
                        
                        assert.isNull(scope);

                        callback();
                    }
                );
            }
        ], done);
    }    

}

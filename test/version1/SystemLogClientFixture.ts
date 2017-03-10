let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ISystemLogClient } from '../../src/version1/ISystemLogClient';

let ACTIVITY1 = {
    type: 'restart',
    details: 'test #1',
    severity: 500
};
let ACTIVITY2 = {
    type: 'restart',
    details: 'test #2',
    severity: 500
};

export class SystemLogClientFixture {
    private _client: ISystemLogClient;
    
    constructor(client: ISystemLogClient) {
        this._client = client;
    }
        
    testCrudOperations(done) {
        var activity1, activity2;

        async.series([
        // Create one activity
            (callback) => {
                this._client.logSystemActivity(
                    null,
                    ACTIVITY1,
                    (err, activity) => {
                        assert.isNull(err);
                        
                        assert.isObject(activity);
                        assert.isNotNull(activity.time);
                        assert.isNotNull(activity.server);
                        assert.equal(activity.type, ACTIVITY1.type);
                        assert.equal(activity.details, ACTIVITY1.details);

                        activity1 = activity;

                        callback();
                    }
                );
            },
        // Create another activity
            (callback) => {
                this._client.logSystemActivity(
                    null,
                    ACTIVITY2,
                    (err, activity) => {
                        assert.isNull(err);
                        
                        assert.isObject(activity);
                        assert.isNotNull(activity.time);
                        assert.isNotNull(activity.server);
                        assert.equal(activity.type, ACTIVITY2.type);
                        assert.equal(activity.details, ACTIVITY2.details);

                        activity2 = activity;

                        callback();
                    }
                );
            },
        // Get all system activities
            (callback) => {
                this._client.getSystemActivities(
                    null,
                    {},
                    {},
                    (err, activities) => {
                        assert.isNull(err);
                        
                        assert.isObject(activities);
                        assert.lengthOf(activities.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    }
}

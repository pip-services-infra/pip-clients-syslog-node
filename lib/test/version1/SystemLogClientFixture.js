"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var ACTIVITY1 = {
    type: 'restart',
    details: 'test #1',
    severity: 500
};
var ACTIVITY2 = {
    type: 'restart',
    details: 'test #2',
    severity: 500
};
var SystemLogClientFixture = (function () {
    function SystemLogClientFixture(client) {
        this._client = client;
    }
    SystemLogClientFixture.prototype.testCrudOperations = function (done) {
        var _this = this;
        var activity1, activity2;
        async.series([
            // Create one activity
            function (callback) {
                _this._client.logSystemActivity(null, ACTIVITY1, function (err, activity) {
                    assert.isNull(err);
                    assert.isObject(activity);
                    assert.isNotNull(activity.time);
                    assert.isNotNull(activity.server);
                    assert.equal(activity.type, ACTIVITY1.type);
                    assert.equal(activity.details, ACTIVITY1.details);
                    activity1 = activity;
                    callback();
                });
            },
            // Create another activity
            function (callback) {
                _this._client.logSystemActivity(null, ACTIVITY2, function (err, activity) {
                    assert.isNull(err);
                    assert.isObject(activity);
                    assert.isNotNull(activity.time);
                    assert.isNotNull(activity.server);
                    assert.equal(activity.type, ACTIVITY2.type);
                    assert.equal(activity.details, ACTIVITY2.details);
                    activity2 = activity;
                    callback();
                });
            },
            // Get all system activities
            function (callback) {
                _this._client.getSystemActivities(null, {}, {}, function (err, activities) {
                    assert.isNull(err);
                    assert.isObject(activities);
                    assert.lengthOf(activities.data, 2);
                    callback();
                });
            }
        ], done);
    };
    return SystemLogClientFixture;
}());
exports.SystemLogClientFixture = SystemLogClientFixture;

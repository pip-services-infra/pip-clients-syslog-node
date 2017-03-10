"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var os = require('os');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var SystemLogLambdaClient = (function (_super) {
    __extends(SystemLogLambdaClient, _super);
    function SystemLogLambdaClient(config) {
        _super.call(this, SystemLogLambdaClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    SystemLogLambdaClient.prototype.getSystemActivities = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'syslog.get_system_activities', callback);
        this.call('get_system_activities', {
            correlation_id: correlationId,
            filter: filter,
            paging: paging
        }, callback);
    };
    SystemLogLambdaClient.prototype.logSystemActivity = function (correlationId, activity, callback) {
        callback = this.instrument(correlationId, 'syslog.log_system_activity', callback);
        activity.time = activity.time || new Date();
        activity.server = activity.server || os.hostname();
        this.call('log_system_activity', {
            correlation_id: correlationId,
            activity: activity
        }, callback);
    };
    /**
     * Unique descriptor for the SystemLogLambdaClient component
     */
    SystemLogLambdaClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-syslog", "lambda", "1.0");
    return SystemLogLambdaClient;
}(pip_services_runtime_node_5.LambdaClient));
exports.SystemLogLambdaClient = SystemLogLambdaClient;

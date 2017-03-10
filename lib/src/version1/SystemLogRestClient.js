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
var SystemLogRestClient = (function (_super) {
    __extends(SystemLogRestClient, _super);
    function SystemLogRestClient(config) {
        _super.call(this, SystemLogRestClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    SystemLogRestClient.prototype.getSystemActivities = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'syslog.get_system_activities', callback);
        var params = {};
        this.addCorrelationId(params, correlationId);
        this.addFilterParams(params, filter);
        this.addPagingParams(params, paging);
        this.call('get', '/syslog', params, callback);
    };
    ;
    SystemLogRestClient.prototype.logSystemActivity = function (correlationId, activity, callback) {
        callback = this.instrument(correlationId, 'syslog.log_system_activity', callback);
        activity.time = activity.time || new Date();
        activity.server = activity.server || os.hostname();
        this.call('post', '/syslog', {
            correlation_id: correlationId
        }, activity, callback);
    };
    ;
    /**
     * Unique descriptor for the SystemLogRestClient component
     */
    SystemLogRestClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-syslog", "rest", "1.0");
    return SystemLogRestClient;
}(pip_services_runtime_node_5.RestClient));
exports.SystemLogRestClient = SystemLogRestClient;

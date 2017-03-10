"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var SystemLogNullClient = (function (_super) {
    __extends(SystemLogNullClient, _super);
    function SystemLogNullClient(config) {
        _super.call(this, SystemLogNullClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    SystemLogNullClient.prototype.getSystemActivities = function (correlationId, filter, paging, callback) {
        if (callback)
            callback(null, []);
    };
    SystemLogNullClient.prototype.logSystemActivity = function (correlationId, activity, callback) {
        if (callback)
            callback(null, null);
    };
    /**
     * Unique descriptor for the SystemLogNullClient component
     */
    SystemLogNullClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-syslog", "null", "1.0");
    return SystemLogNullClient;
}(pip_services_runtime_node_5.AbstractClient));
exports.SystemLogNullClient = SystemLogNullClient;

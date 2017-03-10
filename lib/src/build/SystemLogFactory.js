"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var Version1 = require('../version1');
var SystemLogFactory = (function (_super) {
    __extends(SystemLogFactory, _super);
    function SystemLogFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(Version1.SystemLogNullClient.Descriptor, Version1.SystemLogNullClient);
        this.register(Version1.SystemLogRestClient.Descriptor, Version1.SystemLogRestClient);
        this.register(Version1.SystemLogSenecaClient.Descriptor, Version1.SystemLogSenecaClient);
        this.register(Version1.SystemLogLambdaClient.Descriptor, Version1.SystemLogLambdaClient);
    }
    SystemLogFactory.Instance = new SystemLogFactory();
    return SystemLogFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.SystemLogFactory = SystemLogFactory;

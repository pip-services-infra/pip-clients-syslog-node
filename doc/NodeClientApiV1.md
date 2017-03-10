# Client API (version 1) <br/> SysLog Microservices Client SDK for Node.js

Node.js client API for SysLog microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [SystemActivity class](#class1)
* [SystemActivityPage class](#class2)
* [ISysLogClient interface](#interface)
    - [init()](#operation1)
    - [open()](#operation2)
    - [close()](#operation3)
    - [getSystemActivities()](#operation4)
    - [logSystemActivity()](#operation5)
* [SysLogRestClient class](#client_rest)
* [SysLogSenecaClient class](#client_seneca)
* [SysLogNullClient class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-syslog-node": "git+ssh://git@github.com:pip-services/pip-clients-syslog-node.git",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

If you are using Typescript, add the following type definition where compiler can find it
```javascript
/// <reference path="../node_modules/pip-clients-syslog-node/module.d.ts" />
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-syslog-node').Version1;

// Client configuration
var config = {
    transport: {
        type: 'http',
        host: 'localhost', 
        port: 8003
    }
};

// Create the client instance
var client = sdk.SysLogRestClient(config);

// Open client connection to the microservice
client.open(function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Log system activity
    client.logSystemActivity(
        {
            type: 'restart',
            server: 'server1',
            severity: 500
        }, 
        function (err, activity) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Logged system activity is');
            console.log(activity);
            
            var now = new Date();
    
            // Read server activities
            client.getSystemActivities(
                {
                    server: 'server1',
                    start: new Date(now.getTime() - 24 * 3600 * 1000),
                    end: now
                },
                {
                    paging: true,
                    skip: 0, 
                    take: 100
                },
                function (err, activities) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Activities for server 1 were');
                    console.log(activities.data);
                    
                    // Close connection
                    client.close(); 
                }
            );
        }
    );
});
```

### <a name="class1"></a> SystemActivity class

Represents a record of a system activity performed in the past

**Properties:**
- id: string - unique record id
- time: Date - date and time when activity took place (default: current time)
- server: string - server name where activity took place (default: current host)
- type: string - activity type: 'restart', 'upgrade', 'shutdown', etc.
- severity: number - severity level (impact on system operations) from 0: Low to 1000: High
- details: Object - additional details that can help system administrators in troubleshooting

### <a name="class2"></a> SystemActivityPage class

Represents a paged result with subset of requested SystemActivity objects

**Properties:**
- data: [SystemActivity] - array of retrieved SystemActivity page
- count: int - total number of objects in retrieved resultset

## <a name="interface"></a> ISysLogClient interface

If you are using Typescript, you can use ISysLogClient as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about ISysLogClient interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface ISysLogClient {
    init(refs);
    open(callback);
    close(callback);
    getSystemActivities(filter, paging, callback);
    logSystemActivity(activity, callback);
}
```

### <a name="operation1"></a> init(refs)

Initializes client references. This method is optional. It is used to set references 
to logger or performance counters.

**Arguments:**
- refs: References - references to other components 
  - log: ILog - reference to logger
  - countes: ICounters - reference to performance counters

### <a name="operation2"></a> open(callback)

Opens connection to the microservice

**Arguments:**
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation3"></a> close(callback)

Closes connection to the microservice

**Arguments:**
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation4"></a> getSystemActivities(params, callback)

Retrieves system activities by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - type: string - (optional) type activities
  - server: string - (optional) server where activities occured
  - severity: number - (optional) severity of activities
  - start: Date - (optional) start of the time range
  - end: Date - (optional) end of the time range
- paging: object - paging parameters
  - paging: bool - (optional) true to enable paging and return total count
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result
- callback: (err, page) - callback function
  - err: Error - occured error or null for success
  - page: SystemActivityPage - retrieved SystemActivity objects in paged format

### <a name="operation5"></a> logSystemActivity(params, callback)

Log system activity

**Activities:** 
- activity: SystemActivity - system activity to be logged
- callback: (err, activity) => void - callback function
  - err: Error - occured error or null for success
  - activity: SystemActivity - logged system activity
 
## <a name="client_rest"></a> SysLogRestClient class

SysLogRestClient is a client that implements HTTP/REST protocol

```javascript
class SysLogRestClient extends RestClient implements ISysLogClient {
    constructor(config?: any);
    init(refs);
    open(callback);
    close(callback);
    getSystemActivities(filter, paging, callback);
    logSystemActivity(activity, callback);
}
```

**Constructor config properties:** 
- transport: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> SysLogSenecaClient class

SysLogSenecaClient is a client that implements Seneca protocol

```javascript
class SysLogSenecaClient extends SenecaClient implements ISysLogClient {
    constructor(config?: any);        
    init(refs);
    open(callback);
    close(callback);
    getSystemActivities(filter, paging, callback);
    logSystemActivity(activity, callback);
}
```

**Constructor config properties:** 
- transport: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_null"></a> SysLogNullClient class

SysLogNullClient is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class SysLogNullClient extends AbstractClient implements ISysLogClient {
    constructor();        
    init(refs);
    open(callback);
    close(callback);
    getSystemActivities(filter, paging, callback);
    logSystemActivity(activity, callback);
}
```

/*
 *
 * Environment Configuration
 * 
 */

const environments = {};

// staging will be the default environment
environments.staging = {
    httpPort: 3000,
    httpsPort: 3001,
    envName : 'staging'
}

environments.production = {
    httpPort : 5000,
    httpsPort : 5001,
    envName : 'production'
}

// get environment passed in NODE_ENV
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ?
        process.env.NODE_ENV.toLowerCase() : '';

// set environment to one defined above or staging
const ourEnvironment = typeof(environments[currentEnvironment]) == 'object' ?
        environments[currentEnvironment] : environments.staging;

module.exports = ourEnvironment;







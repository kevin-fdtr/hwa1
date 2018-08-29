/* 
 *
 * Primary file for hwa1 app
 * 
*/

// Dependencies
const http = require('http');
const https = require('https');
const fs = require('fs');
const environment = require('./config');
const url = require('url');
const { StringDecoder } = require('string_decoder');


// Instantiate the HTTP server
const httpServer = http.createServer((req, res) => {
    commonServer(req,res);
});

// Start the HTTP server
httpServer.listen(environment.httpPort, () => {
    console.log(`HTTP Server listening on port ${environment.httpPort}`);
});

// Instantiate the HTTPS server
const httpsOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsOptions, (req, res) => {
    commonServer(req,res);
});

// Start the HTTPS server
httpsServer.listen(environment.httpsPort, () => {
    console.log(`HTTPS Server listening on port ${environment.httpsPort}`);
});


// All the server logic for both the http and https server
const commonServer = (req, res) => {

    // object to store important parts of request
    const data = {};

    // Get the URL and parse it
    const parsedURL = url.parse(req.url, true);

    // Get the path
    const path = parsedURL.pathname;
    data.trimmedPath = path.replace(/^\/+|\/+$/g,'');

    //Get the Query string as an object
    data.queryStringObject = parsedURL.query;

    // Get the HTTP method
    data.method = req.method.toUpperCase();
    
    // Get the headers as an Object
    data.headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();
        data.payload = buffer;

        // Choose the handler this request should go to. If not found use notFound handler
        const chooseHandler = typeof(router[data.trimmedPath]) !== 'undefined' ? router[data.trimmedPath] : notFound;

        // Route the request to the handler specified in the router
        chooseHandler(data, (statusCode, payload) => {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);
            
            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log(`Returning status: ${statusCode} and payload: ${payload}`);
        });
    });
};        

// Define the handlers

const hello = (data, callback) => {
    // Callback a http status code 200
    callback(200, {  'welcomeMessage' : 'Homework Assignment 1 complete'});
};

const notFound = (data, callback) => {
    callback(404);
};
    
const handlers = {
    'hello': hello
};
    
// Define a request router
const router = {
    'hello': handlers.hello
};

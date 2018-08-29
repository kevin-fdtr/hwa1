# hwa1
Node Master Class - Home Work Assignment #1 

## Use
Set NODE_ENV to 'staging' (default) or 'production' before running index.js:

    NODE_ENV=staging node index.js

config.js can be modified to change the http and https ports:

    Staging: HTTP listens on 3000, HTTPS listens on 3001
    Production: HTTP listens on 5000, HTTPS listens on 5001

Server will return 404 on all URL paths except for "/hello".
The "/hello" path will return Content-Type of application/json containing a message.


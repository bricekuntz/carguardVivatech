let config = {
    development: {
        //couchbase connection settings
        database: {
            url: 'mongodb://carguard:carguard@ds237120.mlab.com:37120/carguard'
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '3000'
        }
    },
    production: {}
};
module.exports = config;
const log = require('pino')({
  name: 'init-db'
})
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;  

function initDB({mongodb }, callback , isUseSubcribe) {


    mongoose.connection.on("connected", function(ref) {
        log.info("Connected to " + mongodb.uri + " DB!");
        if(callback) callback();
    });

    // If the connection throws an error
    mongoose.connection.on("error", function(err) {
        log.error('Failed to connect to DB ' + mongodb.uri + ' on startup ', err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        log.info('Mongoose default connection to DB :' + mongodb.uri + ' disconnected');
    });
    // Connect mongo database
    mongoose.connect(mongodb.uri, { config: { autoIndex: mongodb.autoIndex } });
}

// Export the app instance for unit testing via supertest
module.exports = {
     initDB
}
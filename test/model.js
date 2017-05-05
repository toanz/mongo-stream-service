const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports

module.exports = function( name ) {

    return mongoose.model(name, new Schema({_id: String}, { strict: false} ),name);

} 

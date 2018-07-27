var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    id: Number,
    projectStatus: String,
    urgencyLevel: String,
    pickupColors: String,
    vision : String,
    schedule : String
});

module.exports = projectSchema;
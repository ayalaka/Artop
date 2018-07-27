
var express = require('express');
var app = express();
var router = express.Router();

var mongoose = require('mongoose'); //get DB
var connection = mongoose.createConnection('mongodb://ayalaka:artopico1234@ds040898.mlab.com:40898/artop');//connect to the db server
var patientSchema = require('../models/patient');
var patient = connection.model('patient', patientSchema);
var projectSchema = require('../models/project');
var project = connection.model('project', projectSchema);


//var request = require('request');

// routes
router.post('/register', function (req, res) {
    
});

module.exports = router;



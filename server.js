var express = require('express'); //for routing
var http = require('http');
var path = require('path');
var app = express(); //init the server

//initalization for using POST calls
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));//read URL encoded
app.use(bodyParser.json()); //read json data


app.set('port',process.env.PORT || 3000);

app.use(express.static(path.join(__dirname,'app')));


//static routes init
app.use('/app', express.static('app'));

//database
app.use('/auth', require('./controllers/auth.controller'));


// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

//listen on port
var server = app.listen(app.get('port'), function(){
   console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});

var router = express.Router();


// routes
router.post('/register', function (req, res) {
    
});

module.exports = router;

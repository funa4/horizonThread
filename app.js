
/**
 * Module dependencies.
 */

//install required library
var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose');

//global config variant
var db_uri = process.env.MONGOLAB_URI || 'mongodb://horizon:dearth@localhost/horizonThread'; //'mongodb://heroku_app3362615:t0i3pv7kgrvcqvbliigat21pkb@ds029847.mongolab.com:29847/heroku_app3362615'; 
var port = process.env.PORT || 3000; //for heroku

 //extends connect function
 mongoose.connectDB = function(){
 	console.log("db connec by " + db_uri);
 	if(this.connections[0].readyState == 2){//connecting now
 		console.log("connecting is alive. ");
 	}else{
		this.connect(db_uri,
			function(err){
				if(err){
					console.log("db connection error on " + db_uri ); throw err;
				}
			}
		)
	}
}

//create server
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req,res){routes.index(mongoose,req,res)});
app.post('/login', function(req, res){ routes.login(mongoose,req,res) });
app.get('/login', function(req, res){ routes.login(mongoose,req,res) });

app.post('/schedule',function(req,res){ routes.schedule(mongoose,req,res); });
app.post('/reloadlist',function(req,res){ routes.reloadList(mongoose,req,res); });
app.post('/vote',function(req,res){ routes.vote(mongoose,req,res); });

app.get('/ping',function(req, res){
	res.contentType('application/json');
	res.send({res:"connected"});
})

//invoke server
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

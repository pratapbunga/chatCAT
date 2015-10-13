var express = require('express'),
	app = express(),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	config = require('./config/config.js'),
	env = process.env.NODE_ENV || 'development',
	connectMongo = require('connect-mongo')(session);

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

if(env === 'development'){
	app.use(session({secret : config.sessionSecret , saveUninitialized : true, resave : true }));
} else {
	app.use(session(
		{
			secret : config.sessionSecret,
			store: new connectMongo({
				url : config.dbUrl,
				stringify :true
			}),
			saveUninitialized : true, 
			resave : true 
		}
	));
}


//Load the module like this in other files
require('./routes/routes.js')(express, app);




app.listen(3000, function(){
	console.log('ChatCAT Application on port 3000');
	console.log('MODE: ' + env);
});

// mongodb://chatcat:admin@ds043200.mongolab.com:43200/chatcat

module.exports = function(express, app){
	var router = express.Router();

	router.get('/', function(req, res, next){
		res.render('index', {title : 'chatCAT'});
	})

	router.get('/chatrooms', function(req, res, next){
		res.render('chatrooms', {title : 'chatrooms'})
	})

	router.get('/setColor', function(req, res, next){
		req.session.favColor = "White";
		res.send('Setting the favorite color variable');
	})

	router.get('/getColor', function(req, res, next){
		res.send('favorite color is: ' + (req.session.favColor == undefined ? 'Not set' : req.session.favColor) );
	})

	app.use('/', router);
}
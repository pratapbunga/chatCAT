module.exports = function(express, app, passport){
	var router = express.Router();

	function securePages(req, res, next){
		if(req.isAuthenticated()){
			next();
		} else {
			res.redirect('/');
		}
	}

	router.get('/', function(req, res, next){
		res.render('index', {title : 'chatCAT'});
	})

	// Facebook call back Routes
	router.get('/auth/facebook', passport.authenticate('facebook'));
	router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/chatrooms',
		failureRedirect : '/'
	}))

	router.get('/chatrooms', securePages ,function(req, res, next){
		res.render('chatrooms', {title : 'chatrooms', user : req.user})
	})

	router.get('/logout', function(req, res, next){
		req.logout();
		res.redirect('/');
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
var express = require('express');
var router = express.Router();
/* mysql stuff */
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "jbookings"
});

connection.connect();
/* ending mysql stuff */

/* GET home page. */
router.get('/jbookings', function(req, res, next) {
	if(checkSession(req, res)){
		res.writeHead(302, {Location: '/jbookings/profile'});
		res.end();
	}else{
		res.render('index', { title: 'Express' });
	}
});

/* POST home page. */
router.post('/jbookings', function(req, res, next) {
	if(req.body.hasOwnProperty('login')){//user trying to login
		console.log("user trying to login");
		validateLogin(req.body, req, res);
	}else if(req.body.hasOwnProperty('register')){//user trying to register
		console.log("user trying to register");
		if(validateRegister(req.body)){//validated
			console.log("SUCCEEDED TO VALIDATE, TRYING TO INSERT");
			insertUser(req.body, res);
				
		}else{//did not validate
			console.log("FAILED TO VALIDATE, ABORTING...");
			res.render('index', { message: 3 });
			res.end();
		}
	}
	console.log("woo"+JSON.stringify(req.body));
	// res.end();
});

/* GET profile page. */
router.get('/jbookings/profile', function(req, res, next) {
	if(checkSession(req, res)){
		res.render('profile', { username: req.session.user });
	}else{
		res.writeHead(302, {Location: '/jbookings'});
		res.end();
	}
});

/* GET logout page */
router.get('/jbookings/logout', function(req, res, next) {
	req.session.destroy();
	res.writeHead(302, {Location: '/jbookings'});
	res.end();
});

//checking session to see if user is logged in
function checkSession(req, res){
	if(typeof req.session != 'undefined'){
		if(typeof req.session.user != 'undefined' && req.session.user != ''){
			return 1;
		}
	}
	return 0
}
// validating user register input
function validateRegister(obj){
	if(obj.hasOwnProperty("reg-email") && obj["reg-email"] != ""){
		if(obj.hasOwnProperty("reg-password") && obj["reg-password"] != ""){
			if(obj.hasOwnProperty("reg-confirm") && obj["reg-confirm"] != ""){
				if(obj["reg-password"].length >= 6){
					if(obj["reg-password"] == obj["reg-confirm"]){
						return 1
					}
				}
			}
		}
	}
	return 0;
}
//doing directly without email validation for now
function insertUser(obj, res){
	var user = {
		email: obj["reg-email"],
		password: obj["reg-password"],
		activated: "1"
	};
	connection.query('insert into users set ?', user, function(err, result){
		if(err){
			console.error(err);
			res.render('index', { message: 2 });
		}else{
			console.log(result);
			res.render('index', { message: 1 });
		}
		res.end();
	});
}

function validateLogin(obj, req, res){
	connection.query('select count(*) as "check" from users where email = ? and password = ?', [obj["login-email"], obj["login-password"]], function(err, rows, fields){
		if (err) {
			console.error(err);
		}else if(rows[0]['check'] == 1){//logged in successfuly
			console.log(JSON.stringify(rows));
			console.log("setting session ", obj["login-email"]);
			req.session.user = obj["login-email"];
			console.log("session value ", req.session.user);
			res.writeHead(302, {Location: '/jbookings/profile'});

			// res.render('profile', { username: obj["login-email"]});
			res.end();
		}else{//wrong user/pass
			res.render('index', { message: 4 });
			res.end();
		}
	})
}
module.exports = router;









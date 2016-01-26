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
	res.render('index', { title: 'Express' });
});

/* POST home page. */
router.post('/jbookings', function(req, res, next) {
	res.render('index', { title: 'Express' });
	if(req.body.hasOwnProperty('login')){//user trying to login
		console.log("user trying to login");
	}else if(req.body.hasOwnProperty('register')){//user trying to register
		console.log("user trying to register");
		if(validateRegister(req.body)){//validated
			console.log("SUCCEEDED TO VALIDATE, TRYING TO INSERT");
			insertUser(req.body);
		}else{//did not validate
			console.log("FAILED TO VALIDATE, ABORTING...");
		}
	}
	console.log("woo"+JSON.stringify(req.body));
});
//validating user register input
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
function insertUser(obj){
	var user = {
		email: obj["reg-email"],
		password: obj["reg-password"],
		activated: "1"
	};
	connection.query('insert into users set ?', user, function(err, result){
		if(err){
			console.error(err);
		}else{
			console.log(result);
			alert("error");
			setTimeout(function(){alert("Failed to register, please contact an Administrator.")}, 3000);
		}
	});
}
module.exports = router;









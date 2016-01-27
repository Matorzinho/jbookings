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

/* GET list of bookings. */
router.get('/jbookings/profile/listbookings', function(req, res, next) {
	console.log("req.query = ", req.query);
	console.log("========================================");
	queryBookings(res, req.query.m);
});


/* POST profile page (user is adding new booking) */
router.post('/jbookings/profile', function(req, res, next) {
	var filter = req.body.filter;
	delete req.body.filter;
	console.log("ajax started");
	if(validateBooking(req.body)){
		insertBooking(req.body, res, filter)
	}else{
		res.send("0");
		res.end();
	}
	console.log("req ", req.body);
});

/* GET logout page */
router.get('/jbookings/logout', function(req, res, next) {
	req.session.destroy();
	res.writeHead(302, {Location: '/jbookings'});
	res.end();
});
//querying db for bookings (filtering by month when aplicable)
function queryBookings(res, filter){
	var queryAddon = filter ? "where month(date) = "+filter : "";
	connection.query('select DATE_FORMAT(date,"%d/%m/%Y") as "nicedate", time, concat_ws(" ", fname, lname) as "name", phone from bookings '+queryAddon+' order by date desc', function(err, rows, fields){
		if (err) {
			console.error(err);
		}else {
			console.log(rows);
			
			res.send(tbodyContent(rows));
		}
		res.end();
	})
}
//preparing table content
function tbodyContent(rows){
	var tbodyContent = "";
	rows.forEach(function(el, i, arr){
		tbodyContent += "<tr>";
		for(prop in el) tbodyContent += "<td>" +el[prop]+ "</td>";
		tbodyContent += "</tr>";
	});
	return tbodyContent;
}
//checking session to see if user is logged in
function checkSession(req, res){
	if(typeof req.session != 'undefined'){
		if(typeof req.session.user != 'undefined' && req.session.user != ''){
			return 1;
		}
	}
	return 0
}
//validating new booking input
function validateBooking(obj){
	if(obj.hasOwnProperty("date") && obj["date"] != ""){
		if(obj.hasOwnProperty("time") && obj["time"] != ""){
			if(obj.hasOwnProperty("fname") && obj["fname"] != ""){
				if(obj.hasOwnProperty("lname") && obj["lname"] != ""){
					if(obj.hasOwnProperty("phone") && obj["phone"] != ""){
						return 1
					}
				}
			}
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
//inserting bookings
function insertBooking(obj, res, filter){
	connection.query('insert into bookings set ?', obj, function(err, result){
		if(err){
			console.error(err);
				res.send("0");
				res.end();
			// res.render('index', { message: 2 });
		}else{
			console.log(result);
			queryBookings(res, filter);
			// res.send("1");
			// res.render('index', { message: 1 });
		}
	});
}
//
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









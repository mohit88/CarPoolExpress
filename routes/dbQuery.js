
var mongoose = require('mongoose');
mongoose.connect('mongodb://10.16.3.33:8000/');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
	console.log("-----Channel Opened-----")
});

var UserInfo = mongoose.Schema({
    userId : Number
})

var Users = mongoose.model('Users', UserInfo)

exports.getAllUsers = function(req , res) {

	Users.find(function (err, users) {
		if (err) return console.error(err);
		res.send(users);
	});

}

exports.getUser = function(req , res) {

	var UserId = req.param('userId');
	Users.find({userId : UserId},function (err, users) {
		if (err) return console.error(err);
		res.send(users);
	});

}

exports.addUser = function (req, res) {

	var UserId = req.param('userId');
	var user = new Users({userId : UserId});
	user.save(function (err, user) {
		if (err) return console.error(err);
	});
	res.redirect("/users");
}

exports.removeUser = function(req , res) {

	var UserId = req.param('userId');
	Users.remove({userId : UserId },function (err, users) {
			if (err) return console.error(err);
		});
	res.redirect("/users");
}

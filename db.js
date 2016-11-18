var mongoose = require('mongoose'), URLSlugs = require('mongoose-url-slugs');

var passportLocalMongoose = require('passport-local-mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var User = new mongoose.Schema({
    email: {type : String, unique:true, dropDups:true},
    firstName: String,
    lastName: String,
    //messages:[Message], this is an example of linking a list of objects
	//colorScheme:{type: ObjectId, ref: 'ColorScheme'}, this is an example of linking to one object via ID
});

User.plugin(passportLocalMongoose);


mongoose.model('User', User);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/doctordb');

//TODO add the rest of the user fields
//TODO add a patient object
//TODO add a doctor object?

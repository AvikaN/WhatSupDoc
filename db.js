var mongoose = require('mongoose'), URLSlugs = require('mongoose-url-slugs');

var passportLocalMongoose = require('passport-local-mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var Medication = new mongoose.Schema({
  name: String,
  dosage: Number,
  frequency: String, // dropdown (day, week, ...)
});

var Question = new mongoose.Schema({
  question: String,
  responseType: String, // dropdown (number, text, yes/no, ...)
});

var Survey = new mongoose.Schema({
  id: String,
  questions: [Question],
});

var Response = new mongoose.Schema({
  surveyId: Number,
  responses: [String],
});

var Patient = new mongoose.Schema ({
    email: {type : String, unique:true, dropDups:true},
    firstName: String,
    lastName: String,
    medications: [Medication],
    responses: [Response],
    condition: String, //what the patient is being treated for
    age: Number,
    weight: Number,
    height: Number,
    gender: String, // dropdown
    race: String, // dropdown
});

// User is the doctor
var User = new mongoose.Schema({
    email: {type : String, unique:true, dropDups:true},
    firstName: String,
    lastName: String,
    hospital: String,
    doctorType: String,
    patients: [Patient]
});

mongoose.model('Medication', Medication);
mongoose.model('Question', Question);
mongoose.model('Survey', Survey);
mongoose.model('Response', Response);
mongoose.model('Patient', Patient);

User.plugin(passportLocalMongoose);
mongoose.model('User', User);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/doctordb');

//TODO add the rest of the user fields
//TODO add a patient object
//TODO add a doctor object?

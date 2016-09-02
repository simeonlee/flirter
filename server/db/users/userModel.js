var mongoose = require('mongoose');
var utils = require('../lib/utils');

userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  age: Number,
  ageRange: String,
  birthday: String,
  gender: String,
  city: String,
  job: String,
  education: String,
  description: String,
  profileImageUrl: String,
  coverPhotoUrl: String,
  imageUrls: [ String ],
  email: String,
  notes: [
    {
      body: String,
      date: Date,
      location: {
        lat: Number,
        lng: Number
      }
    }
  ],
  peopleLiked: [
    {
      userId: String,
      messageLiked: String,
      dateLiked: Date,
      locationLiked: String
    }
  ],
  lastLogInLocation: {
    lat: Number,
    lng: Number
  },
  joinDate: { type: Date, default: Date.now },

  // teens can chat with other teens, why not...
  // just use FB to verify ages
  minor: Boolean,
  meta: {
    likedSomeone: { type: Number, default: 0 },
    beenLiked: { type: Number, default: 0 }
  }
},{ _id: false });

userSchema.statics.findOrCreate = function(profile, cb) {
  // store in server memory
  exports.userId = profile.id;
  var userObj = new this();
  this.findOne({_id: profile.id}, function(err, result) {
    if (!result) {
      console.log(profile);
      var raw = JSON.parse(profile._raw);
      userObj._id = profile.id;
      userObj.name = raw.first_name;
      userObj.email = profile.emails[0].value;
      userObj.ageRange = raw.age_range;
      userObj.age = utils.calculateAge(raw.birthday);
      userObj.birthday = raw.birthday;
      userObj.gender = raw.gender;
      userObj.city = raw.location.name;
      userObj.job = raw.work;
      userObj.education = raw.education[0].school.name;
      userObj.description = raw.bio;
      userObj.profilePhotoUrl = profile.photos[0].value;
      userObj.coverPhotoUrl = raw.cover.source;
      userObj.save(cb);
    } else {
      cb(err, result);
    }
  })
}

exports.userId; // represents self in server.js
exports.User = mongoose.model('User', userSchema);
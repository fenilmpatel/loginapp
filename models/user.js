const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
    
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
   username: {
       type: String,
       required: true
   },
   password: {
       type: String
   },
    terms: {
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

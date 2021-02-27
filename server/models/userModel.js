const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    street: String,
    city: String,
    zipcode: Number,
    tasks: [{title : String, completed: Boolean}],
    posts: [{title : String, body : String}]
});

module.exports = mongoose.model('users', UserSchema)

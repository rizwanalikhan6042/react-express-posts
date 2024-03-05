const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    firstName: {
        type:String,required : true

    },

    lastName: {
        type:String,required : true

    },
    emailAddress: {
        type:String,required : true,unique:true

    },
    password: {
        type:String,required : true,unique:true
    } 
});

module.exports = mongoose.model('users',usersSchema);


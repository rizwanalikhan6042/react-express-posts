const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    fname: {
        type:String,required : true

    },

    lname: {
        type:String,required : true

    },
    email: {
        type:String,required : true,unique:true

    },
    password: {
        type:String,required : true,unique:true

    }


    
});

module.exports = mongoose.model('users',usersSchema);


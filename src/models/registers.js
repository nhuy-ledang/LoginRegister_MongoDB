const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    confirmpassword:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    }
})


const Register = new mongoose.model("userRegister", employeeSchema);

module.exports = Register;
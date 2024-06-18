const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    }
},{
    timeseries: true
})

userSchema.pre('save', async function (){
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
})

userSchema.methods.isPasswordMatch = async function(enteredPassowrd){
    return await bcrypt.compare(enteredPassowrd, this.password);
}

module.exports = mongoose.model('User', userSchema);
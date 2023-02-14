const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const{ isEmail} = require('validator')
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken')


const userSchema = new Schema({
    name :{
        type: String,
        required: [true, 'Please provide email'],
        minlength: [3, 'minimum length of email is 3'],
        unique: true,
    },
    email:{
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Please provide a valid email'],
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [7, 'minimum length of password is 7'],
    },
}, {timestamps: true}
);

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.generateToken = function(){
    return jwt.sign({userId: this._id, name: this.name}, 
        process.env.JWT_SECRET,
        {expiresIn: '3d'})
}
userSchema.methods.comparePassword = async function(userPassword){
    const isCorrect = await bcrypt.compare(userPassword, this.password)
    return isCorrect;
}



module.exports = mongoose.model('User', userSchema);
const Users = require('../model/user'); 
//const  jwt = require('jsonwebtoken');
const handleErrors = require('../utils/handleErrors');

const register = async(req,res)=>{
    //res.send('register user')
    const { email,name,password} = req.body;
    if (!email || !password || !name){
        res.status(400).json({success: false, message: 'please provide neccessary information'});
    }
    try{
        const user = await Users.create({...req.body})
        const token = user.generateToken();
        res
        .status(201)
        .json({ data: {name: user.name, email: user.email}, token})

    }catch(error){
        const errors = handleErrors(error);
        res.json(errors)
    }
}

const login = async(req,res)=>{
    //res.send('login user')
    const{email, password}= req.body;
    if(!email || !password){
        return res.status(401).json({success: false, message:'Please provide necessary information'})  
    }
    try{
        const user = await Users.findOne({email});
        if (!user){
            //return res.status(401).json({success: false});
            throw Error ('incorrect Email ')
        }
        const authenticated  = await user.comparePassword(password)
        if(!authenticated){
            //return res.status(401).json({success: false});
            throw Error ('incorrect Password')
        }
        const token = user.generateToken();
        res.status(200).json({user: {name: user.name, email:user.email},token})

    }catch(error){
        console.log(error);
        res.json(error)

    }
}

module.exports = {register, login};
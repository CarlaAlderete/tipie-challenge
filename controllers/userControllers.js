const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userControllers = {
    addUser:async(req,res)=>{
        const {name, mail, password, age, sector} = req.body
        const hashedPassword = bcryptjs.hashSync(password)
        const newUser = new User({name:name.trim().toUpperCase(), mail:mail.trim(), password:hashedPassword, age, sector:sector.trim().toUpperCase()})
        try{
            let repeatUser = await User.findOne({mail})
            if(repeatUser){
                throw new Error('Mail is being used with another account')
            }await newUser.save()
            let token = jwt.sign({mail:newUser.mail, name:newUser.name}, process.env.TOKEN)
            res.json({success:true, res:{name:newUser.name,token}})
        }catch(err){
            res.json({success:false, res:err.message})
        }
    },
    singInUser:async(req,res)=>{
        const {mail, password} = req.body
        try{
            let userExist = await User.findOne({mail})
            if(!userExist) throw new Error('The data entered is not valid')
            let match=bcryptjs.compareSync(password,userExist.password)
            if(!match)throw new Error('The data entered is not valid')
            let token = jwt.sign({mail:userExist.mail, name:userExist.name}, process.env.TOKEN)
            res.json({success:true, res:{name:userExist.name,token}})
        }catch(err){
            res.json({success:false, res:err.message})
        }
    },
    forcedSignIn:(req,res)=>{
        res.json({...req})
    },
}
module.exports = userControllers
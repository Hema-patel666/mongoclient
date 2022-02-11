const { urlencoded } = require('express');
var Users = require('../model/userModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { exists } = require('../model/userModel');
const { Error } = require('mongoose');

//Add User 
module.exports.createUser = async (body) => {
    try {
        let userlist = await Users.create(body);
        return userlist;
    }
    catch (e) {
        console.log(e.message)
        throw Error('Error while product not created')
    }
}

module.exports.findAllUser = async (body) => {
    try {
        var displayalluser = await Users.find({})
        return displayalluser;
    }
    catch (e) {
        console.log(e.message)
        throw Error("Error while product not found all")
    }
}

module.exports.findOneUser = async (body) => {
    try {
        let oneuser = await Users.findOne({_id:body})
        return oneuser
    }
    catch (e) {
        console.log(e.message)
    }
}

module.exports.getUpdateUser = async (body, next) => {
    try {
        //  let nm={$set:next}
        // console.log(nm)
        let updateval = await Users.updateOne({ _id: body }, { $set: next })
        // console.log(updateval)
        return updateval
    }
    catch (e) {
        console.log(e.message)
    }
}
module.exports.deleteUsers = async (body) => {
    try {
        // console.log(body)
        let delval = await Users.deleteOne({ _id: body })
        return delval
    }
    catch (e) {
        console.log(e.message)
    }
}
module.exports.logins = async (body,callback) => {

    try {
        console.log("body",body)
        const emails = body.eml;
        const passwords = body.pwd;
console.log(emails+"  "+passwords)
        const user = await Users.findOne({ email: emails });
        console.log(user)
               
         if (user && (await bcrypt.compare(passwords, user.password))) {
                // Create token
                const token1 = jwt.sign(
                    {
                        user_id: user._id,
                        emails
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                // save user token
                user.token = token1;
                await Users.updateOne({ email: emails }, { $set: { "token": token1 } })
    
                return user
    
            }
        
        

    }
    catch (err) {
        console.log(err);
    }
}


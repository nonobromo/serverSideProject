const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/users");
const Joi = require("joi");
const { createNewLogFile } = require("../logs/logs");


router.post("/", async (req, res) =>{
    //validate user input
const {error} = validate(req.body);

if (error){
    res.status(400).send(error.details[0].message);
    return;
}
    

//validate system

const user = await User.findOne({email: req.body.email})


if (!user){
    res.status(400).send("Invalid Email");
    createNewLogFile("Login attempt with an invalid email")
    return;
}

const validPassword = await bcrypt.compare(req.body.password, user.password)

if(!validPassword){
    res.status(400).send("invalid password");
    createNewLogFile("Login attempt with an invalid password")
    return;
}

const token = jwt.sign({_id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin}, process.env.JWT_TOKEN);

res.send({
    token
})
})




function validate(credentials){
    const schema = Joi.object({
        email: joi.string().min(6).max(255).required(),
        password: joi.string().min(6).max(1024).required()
    })

    return schema.validate(credentials)
}

module.exports = router
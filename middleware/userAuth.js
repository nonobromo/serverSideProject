const { User } = require("../models/users")

 module.exports = async (req, res, next) =>{
    const userId = req.user

    
    try{
        if (userId._id !== req.params.id){
            res.status(400).send('not the correct user');
            return
        }
        next()
    }catch{
        res.status(401).send("No auth");
    }

}
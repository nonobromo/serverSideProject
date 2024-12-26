const { User } = require("../models/users")

 module.exports = async (req, res, next) =>{
    const userId = req.user

    const isUserAdmin = await User.findById(userId)

    try{
        if (!isUserAdmin.isAdmin){
            res.status(400).send("Must be an Admin type user");
            return
        }
    
        next()
    }catch{
        res.status(401).send("No auth");
    }

}
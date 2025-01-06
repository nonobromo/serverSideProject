const { createNewLogFile } = require("../logs/logs");

module.exports = async (req, res, next) => {
    const userId = req.user;

    try {
        console.log("this is from the middlware", req.params.id)
        if (userId._id.toString() === req.params.id) {
            next();
        } else {
            createNewLogFile(`A User with the id of: ${req.user._id} \n tried to edit the user with the id of: \n ${req.params.id}`)
            res.status(401).send("Must be the registered user");
        }
    } catch (error) {
        res.status(401).send("No Auth");
    }
}

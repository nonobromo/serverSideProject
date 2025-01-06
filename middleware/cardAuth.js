const { createNewLogFile } = require("../logs/logs");
const { Card } = require("../models/cards");

module.exports = async (req, res, next) => {
    const userId = req.user;
    const card = await Card.findById(req.params.id)
    console.log(card.user_id, req.user._id)
    try {
        if (card.user_id.toString() === req.user._id) {
            next();
        } else {
            createNewLogFile(`A User with the id of: ${req.user._id} \n tried to edit the card with the id of: \n ${req.params.id}`)
            res.status(401).send("Must be the registered user");
        }
    } catch (error) {
        res.status(401).send("No Auth");
    }
}

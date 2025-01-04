module.exports = async (req, res, next) => {
    const userId = req.user;

    try {
        console.log("this is from the middlware", req.params.id)
        if (userId._id.toString() === req.params.id) {
            next();
        } else {
            res.status(401).send("Must be the registered user");
        }
    } catch (error) {
        res.status(401).send("No Auth");
    }
}

module.exports = async (req, res, next) => {
    const userId = req.user;

    try {
        if (userId._id.toString() === req.params.id || userId.isAdmin) {
            next();
        } else {
            res.status(401).send("Must be the registered user or admin");
        }
    } catch (error) {
        res.status(401).send("Must be the registered user or admin");
    }
}

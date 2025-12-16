const Auth = (req, res, next) => {
    const token = "ABCDEF";
    const access = token === "ABCDEF";

    if (!access) {
        return res.status(403).send("No permission");
    }

    next();
};

module.exports = Auth;

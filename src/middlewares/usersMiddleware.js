const { route } = require("../routes/userRoute");

const checkRole = (req, res, next) => {
    // ex check role === admin
    try {
        next();
    } catch {

    }
}

module.exports = checkRole;
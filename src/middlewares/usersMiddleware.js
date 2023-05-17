
const checkRole = (req, res, next) => {
    // ex check role === admin
    try {
        next();
    } catch {

    }
}

module.exports = checkRole;
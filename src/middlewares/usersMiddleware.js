// eslint-disable-next-line no-unused-vars
const routes = require('../routes/userRoute');

const checkRole = (req, res, next) => {
    // ex check role === admin
    try {
        next();
    } catch {
        return res.json({
            message: 'Error',
        });
    }
}

module.exports = checkRole;
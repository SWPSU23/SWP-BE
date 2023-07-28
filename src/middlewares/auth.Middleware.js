const accessControlList = require('../configs/accessControlList.Config');

const authentification = (action, items) => {
    return (req, res, next) => {
        if (req.session.user) {
            const user = req.session.user;
            const role = user.role;
            if (accessControlList[items][action].includes(role)) {
                next();
            } else {
                res.status(403).send({ message: 'Forbidden' })
            }
        } else {
            res.status(401).send({ message: 'Unauthorized' })
        }
    }
}
module.exports = { authentification }

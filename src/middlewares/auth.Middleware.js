const accessControlList = require('../configs/accessControlList.Config');

const authentification = (action, items) => {
    return (req, res, next) => {
        if (req.session.user) {
            const user = req.session.user;
            const role = user.role;
            if (accessControlList[items][action].includes(role)) {
                console.log('Access granted');
                next();
            }
        } else {
            res.status(401).send({ message: 'Unauthorized' })
        }
    }
}
module.exports = { authentification }

const authentification = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            next()
        }
    }
    else {
        res.status(401).send({ message: 'Unauthorized' })
    }    
}
module.exports = { authentification }

const authModel = require('../models/auth.Model')
const bcrypt = require('bcrypt')
const login = async (req, res) => {
    try {
        const { phone, password } = req.body
        const user = await authModel.getUserByPhone(phone)
        if (user.length === 0) {
            return res.status(404).send({
                message: 'Not found',
            })
        }
        try {
            // for debug only
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.error('Error hashing password', err)
                }
                global.logger.info('Hashed password', hash)
            })
            // compare password
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    console.error('Error comparing password', err)
                    return res.status(500).send({
                        message: 'Internal server error',
                    })
                }
                if (result) {
					// remove password from user object
					delete user[0].password
                    req.session.user = user[0]
                    return res.status(200).send({
                        message: 'Login success',
                        employee_detail: user[0],
                    })
                }
                global.logger.info('Password is incorrect')
                return res.status(401).send({
                    message: 'Unauthorized',
                })
            })
        } catch (error) {
            console.error('Error comparing password', error)
            return res.status(500).send({
                message: 'Internal server error',
            })
        }
    } catch (error) {
        console.error('Error getting user by phone', error)
        return res.status(500).send({
            message: 'Internal server error',
        })
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy()
        res.status(200).send({
            message: 'Logout success',
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
        })
    }
}
const getUserInfo = async (req, res) => {
    try {
        // get user info from session
        const user = req.session.user
        if (!user) {
            return res.status(401).send({
                message: 'Unauthorized',
            })
        }
        if (user) {
            return res.status(200).send({
                message: 'Get user info success',
                user: user,
            })
        }
    } catch (error) {
        global.logger.error(error)
        return res.status(500).send({
            message: 'Internal server error',
        })
    }
}
module.exports = {
    login,
    logout,
    getUserInfo,
}

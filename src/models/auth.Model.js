const Joi = require("joi")
const pool = require("../services/query.Service").getPool()
const authSchema = Joi.object({
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
})

const getUserByPhone = async (phone) => {
    const { error, value } = authSchema.validate({ phone })
    if (error) {
        global.logger.error(error)
        return Promise.reject(error)
    }
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT * FROM Employee WHERE phone = ?',
            [value.phone],
            (err, result) => {
                if (err) {
                    return reject(err.message)
                }
                return resolve(result)
            }
        )
    }
    )
}
module.exports = {
    getUserByPhone,
}
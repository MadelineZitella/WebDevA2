const joi = require('joi')

const registerValidation = (data) => {
    const schemaValidation = joi.object({
        name:joi.string().required(), 
        email:joi.string().required().email(), 
        password:joi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

const loginValidation = (data) => {
    const schemaValidation = joi.object({
        email:joi.string().required().email(), 
        password:joi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
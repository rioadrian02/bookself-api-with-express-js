import Joi from "joi"

const userPayloadSchema = Joi.object({
    username: Joi.string().min(6).max(100).required(),
    password: Joi.string().min(6).required(),
    fullname: Joi.string().max(100).required()
});

export { userPayloadSchema }
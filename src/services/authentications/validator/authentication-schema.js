import Joi from "joi"

const postAuthenticationPayloadSchema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().min(6).required(),
});

const putAuthenticationPayloadSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

const deleteAuthenticationPayloadSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

export { postAuthenticationPayloadSchema, putAuthenticationPayloadSchema, deleteAuthenticationPayloadSchema }
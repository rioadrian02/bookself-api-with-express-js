import Joi from "joi";

const collaborationPayloadSchema = Joi.object({
    bookId: Joi.string().max(50).required,
    userId: Joi.string().max(50).required
});

const collaborationDeletePayloadSchema = Joi.object({
    bookId: Joi.string().max(50).required,
    userId: Joi.string().max(50).required
});


export { collaborationPayloadSchema, collaborationDeletePayloadSchema }
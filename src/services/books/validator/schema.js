import Joi from "joi";

export const bookPayloadSchema = Joi.object({
    name: Joi.string().max(255).required(),
    year: Joi.number().max(new Date().getFullYear()).required(),
    author: Joi.string().max(255).required(),
    summary: Joi.string().optional(),
    publisher: Joi.string().max(255).required(),
    pageCount: Joi.number().required(),
    readPage: Joi.number().max(Joi.ref('pageCount')).required(),
    reading: Joi.bool().required()
});

export const bookQuerySchema = Joi.object({
    name: Joi.string().optional(),
    reading: Joi.number().optional(),
    finished: Joi.number().optional()
});


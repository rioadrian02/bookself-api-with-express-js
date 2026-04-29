import Joi from "joi";

const exportBodyPayload = Joi.object({
    targetEmail: Joi.string().email({ tlds: true }).required()
});

export { exportBodyPayload }
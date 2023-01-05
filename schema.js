import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const schema = Joi.object({
    login: Joi.string().alphanum().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    age: Joi.number().min(4).max(130).required()
});

export { schema, validator };

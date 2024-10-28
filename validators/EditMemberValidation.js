import Joi from 'joi';
import { Member } from '../models/member.model.js';

const editMemberSchema = Joi.object({
    name: Joi.string().required().min(3).max(100).messages({
        'string.empty': 'Name is required.',
        'string.min': 'Name should more than 3 characters',
        'string.max': 'Name should be less than 100 characters'
    }),

    age: Joi.number().integer().required().messages({
        'number.base': 'Age must be a number.',
        'number.empty': 'Age is required, write your age'
    }),

    university: Joi.string().required().messages({
        'string.empty': 'University is required.'
    }),

    email: Joi.string().email().required()
    .messages({
        'string.empty': 'Email is required.',
        'string.email': 'Invalid email format, EX:(Elshahaby@gmail.com).'
    }),
    // .external(async (value, helpers) => {
    //     const { id } = helpers.context;  // id alaways undefined so I handle the uniqueness at mongoose schema.
    //     if (!id) {
    //         throw new Joi.ValidationError("Unable to verify email uniqueness due to missing ID context.");
    //     }
    //     const existingMember = await Member.findOne({ phone: value, _id: { $ne: id } });
    //     if (existingMember) {
    //         throw new Joi.ValidationError('Phone number already exists, Write another one');
    //     }
    // })

    phone: Joi.string().pattern(/^(010|011|012|015)\d{8}$/).required()
    .messages({
        'string.pattern.base': 'Phone number must be 11 digits started with 010 or 011 or 012 or 015.',
        'string.empty': 'Phone number is required.'
    }),
    // .external(async (value, helpers) => {
    //     const { id } = helpers.context;  // id alaways undefined so I handle the uniqueness at mongoose schema.
    //     if (!id) {
    //         throw new Joi.ValidationError("Unable to verify phone uniqueness due to missing ID context.");
    //     }
    //     const existingMember = await Member.findOne({ phone: value, _id: { $ne: id } });
    //     if (existingMember) {
    //         throw new Joi.ValidationError('Phone number already exists, Write another one');
    //     }
    // })

    technicalCommittee: Joi.string().required().messages({
        'string.empty':'Technical Committee is required, Write it!!'
    }),
    nonTechnicalCommittee: Joi.string().required().messages({
        'string.empty':'Non Technical Committee is required, Write it!!'
    }),
    image: Joi.optional()
});

export default editMemberSchema;

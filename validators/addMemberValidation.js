import Joi from 'joi';
import { Member } from '../models/member.model.js';

// Define the Joi schema for adding a new member
const addMemberSchema = Joi.object({
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

    email: Joi.string().email().required().external(async (value) => {
        const existingMember = await Member.findOne({ email: value });
        if (existingMember) {
            throw new Joi.ValidationError('Email already exists, Write another one');
        }
    })
    .messages({
        'string.empty': 'Email is required.',
        'string.email': 'Invalid email format, EX:(Elshahaby@gmail.com).'
    }),

    phone: Joi.string().pattern(/^(010|011|012|015)\d{8}$/).required().external(async (value) => {
        const existingMember = await Member.findOne({ phone: value });
        if (existingMember) {
            throw new Joi.ValidationError('Phone number already exists, Write another one');
        }
    })
    .messages({
        'string.pattern.base': 'Phone number must be 11 digits started with 010 or 011 or 012 or 015.',
        'string.empty': 'Phone number is required.'
    }),

    technicalCommittee: Joi.string().required().messages({
        'string.empty':'Technical Committee is required, Write it!!'
    }),
    nonTechnicalCommittee: Joi.string().required().messages({
        'string.empty':'Non Technical Committee is required, Write it!!'
    }),
    image: Joi.optional()
});

export default addMemberSchema ;
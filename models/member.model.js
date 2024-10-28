import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'] 
    },
    age:{
        type: Number,
        required: [true, 'Age is required'],
    },
    university:{
        type: String,
        required: [true, 'University is required']},
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is added before add anoter one, Email must be unique'],
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email format, EX: (mo@gmail.com)']
    },
    phone:{
        type: String,
        required: [true, 'Phone number is required'],
        unique: [true, 'Phone number is added before, Phone number must be unique'],
        match: [/^(010|011|012|015)\d{8}$/, 'Phone number must be 11 digits']
    },
    technicalCommittee:{
        type: String,
        required:[true,'tecnical Committee is required'],
    },
    nonTechnicalCommittee:{
        type: String,
        required:[true,'non tecnical committee is required'],
    },
    image: String,
},{timestamps:true})

const Member = mongoose.model('Member',memberSchema);

export{Member};
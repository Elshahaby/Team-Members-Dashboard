import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    university:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    technicalCommittee:{
        type: String,
        required:true,
    },
    nonTechnicalCommittee:{
        type: String,
        required:true,
    },
    image: String,
},{timestamps:true})

const Member = mongoose.model('Member',memberSchema);

export{Member};
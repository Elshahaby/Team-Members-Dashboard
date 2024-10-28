import { Member } from '../models/member.model.js';
import fs from 'fs';

// Get all members
export const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.render('HomePage', { members });
    } catch (err) {
        console.log("Message from get / route" + err.message);
        res.status(500).send('Error displaying the members: ' + err.message);
    } finally {
        console.log("===> Display the HOME PAGE");
    }
};

// Get a member by ID
export const getMemberById = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        res.render('DisplayMember', { member });
    } catch (err) {
        console.log("Error display member" + err.message);
        res.status(500).send('Error displaying the member: ' + err.message);
    } finally {
        console.log("===> Display The Member Page");
    }
};

// Show the Add Member page
export const getAddMemberPage = (req, res) => {
    res.render('AddingMember');
};

// Show the Edit Member page
export const getEditMemberPage = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        res.render('EditingPage', { member });
    } catch (err) {
        console.log("Error fetching member for edit: " + err.message);
        res.status(500).send('Error displaying edit page: ' + err.message);
    }finally{
        console.log("===> Display The Edit Member Page");
    }
};

// Add a new member
export const addMember = async (req, res) => {
    try {
        const { name, age, university, email, phone, technicalCommittee, nonTechnicalCommittee } = req.body;
        const newMember = new Member({
            name,
            age,
            university,
            email,
            phone,
            technicalCommittee,
            nonTechnicalCommittee,
            image: req.file ? `/images/${req.file.filename}` : undefined
        });

        await newMember.save();
        res.redirect('/');
    } catch (err) {
        handleError(err, res);
    } finally {
        console.log("<-- Member Added Successfully -->");
    }
};

// Edit an existing member
export const editMember = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        const { name, age, university, email, phone, technicalCommittee, nonTechnicalCommittee } = req.body;
        const updatedMemberData = { name, age, university, email, phone, technicalCommittee, nonTechnicalCommittee, image: member.image };

        if (req.file) {
            if (member.image) {
                const oldImagePath = `./${member.image}`;
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error("Error deleting previous image:", err);
                });
            }
            updatedMemberData.image = `/images/${req.file.filename}`;
        }

        await Member.findByIdAndUpdate(req.params.id, updatedMemberData);
        res.redirect(`/member/${req.params.id}`);
    } catch (err) {
        handleError(err, res);
    } finally {
        console.log("<---- Member Edited Successfully  ---->");
    }
};

// Delete a member
export const deleteMember = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (member.image) {
            const oldImagePath = `./${member.image}`;
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Error deleting previous image:", err);
            });
        }
        await Member.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.log("Error Deleting Member: " + err.message);
        res.status(500).send("Error Deleting Member" + err.message);
    } finally {
        console.log("<----- Member Deleted Successfully ----->");
    }
};

// Handle errors
const handleError = (err, res) => {
    if (err.code === 11000) {
        res.status(400).send('Email or phone number already exists.');
    } else if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(err => err.message);
        res.status(400).send(messages.join(', '));
    } else {
        console.log(err.message);
        res.status(500).send('Error: ' + err.message);
    }
};

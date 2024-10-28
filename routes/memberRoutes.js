import express from 'express';
import upload from '../middlewares/upload.js';
import validateRequest from '../middlewares/validateRequest.js';
import { 
    getAllMembers, 
    getMemberById, 
    getAddMemberPage, 
    getEditMemberPage, 
    addMember, 
    editMember, 
    deleteMember 
} from '../controllers/memberControllers.js';
import addMemberSchema from '../validators/addMemberValidation.js';
import editMemberSchema from '../validators/EditMemberValidation.js';

const router = express.Router();

router.get('/', getAllMembers);
router.get('/member/:id', getMemberById);
router.get('/add-member', getAddMemberPage);
router.get('/edit-member/:id', getEditMemberPage);

router.post('/add-member', upload.single('image'), validateRequest(addMemberSchema), addMember);
router.post('/edit-member/:id', upload.single('image'), validateRequest(editMemberSchema), editMember);
router.post('/delete-member/:id', deleteMember);

export default router;

import express from 'express';
import mongoose from 'mongoose';
import {Member} from './models/member.model.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';



const app = express();

// db connection
mongoose.connect('mongodb+srv://Elshahaby:KUBrgQyLy36_LGs@learn-mongodb.zbvwf.mongodb.net/TeamDashboard?retryWrites=true&w=majority&appName=learn-mongodb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('mongodb server started')
}); 


// Set up Multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        console.log('File uploaded\n',file)
        cb(null, Date.now() + path.extname(file.originalname));  // Generate a unique file name
    }
});

const upload = multer({storage: storage});
app.use('/images',express.static('images'));


// middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');

app.listen(3000 , ()=> console.log("server listennig on port 3000"));

// member routes
app.get('/',async(req,res)=>{
    try{
        const members = await Member.find();  
        res.render('HomePage',{members});  
    }
    catch(err){
        console.log("Message form get / route" + err.message);
        res.status(500).send('Erorr displaying the members: '+ err.message);
    }
});

app.get('/member/:id',async (req,res)=>{
    try{
        const member = await Member.findById(req.params.id);
        res.render('DisplayMember', {member})
    }
    catch(err){
        console.log("Erorr display member" + err.message);
        res.status(500).send('Erorr displaying the member: '+ err.message);
    }
})

app.get('/add-member',(req,res)=>{
    try{
        res.render('AddingMember');
    }catch(err){
        res.status(500).send('Erorr displaying adding page: '+ err.message);
    }
})

app.get('/edit-member/:id',async(req,res)=>{
    try{
        const member = await Member.findById(req.params.id);
        res.render('EditingPage',{member});
    }catch(err){
        console.log("Erorr Message form edit page: " + err.message);
        res.status(404).send("Erorr Message from edit page: Member not found "+ err.message);
    }
})

app.post('/add-member',upload.single('image'),async(req,res)=>{
    try{
        // the added data for a member
        const {name,age,university,email,phone,technicalCommittee,nonTechnicalCommittee} = req.body;
        // add new document at the Member collection
        const newMember = new Member({
            name,
            age,
            university,
            email,
            phone,
            technicalCommittee,
            nonTechnicalCommittee,
            image:req.file ? `/images/${req.file.filename}` : undefined
        })

        // save the Member data
        await newMember.save();
        // redirect to home page
        res.redirect('/');
    }catch(err){
        console.log(err.message);
        res.status(500).send('Erorr Adding the member ' + err.message)
    }
})

app.post('/edit-member/:id',upload.single('image'),async(req,res)=>{
    try{
        // get old info for the member before update him.
        const member = await Member.findById(req.params.id);
        // updated data
        const {name,age,university,email,phone,technicalCommittee,nonTechnicalCommittee} = req.body;

        const updatedMemberData = {
            name,
            age,
            university,
            email,
            phone,
            technicalCommittee,
            nonTechnicalCommittee,
            image: member.image,   
        };

        // if adding a new image
        if(req.file){
            // deleting the old image
            if(member.image){
                const oldImagePath = `./${member.image}`;
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error("Error deleting previous image:", err);
                });
            }
            // upload the current image
            updatedMemberData.image = `/images/${req.file.filename}`;
        }

        const Id = req.params.id;
        // updating member data
        await Member.findByIdAndUpdate(Id , updatedMemberData);
        res.redirect(`/member/${Id}`);
    }
    catch(err){
        console.log("Erorr updating member");
        res.status(500).send("Erorr Updating Member : " + err.message);
    }
})


app.use((req,res)=>{
    res.status(404).send("404 NOT FOUND");
})
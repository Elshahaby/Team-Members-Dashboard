import express from 'express';
import mongoose from 'mongoose';
import memberRoutes from './routes/memberRoutes.js';

const app = express();

// db connection
mongoose.connect('mongodb+srv://Elshahaby:KUBrgQyLy36_LGs@learn-mongodb.zbvwf.mongodb.net/TeamDashboard?retryWrites=true&w=majority&appName=learn-mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB server started');
});

// middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static('images'));
app.set('view engine', 'ejs');

// member routes
app.use(memberRoutes);

// 404 error handling
app.use((req, res) => {
    res.status(404).send("404 NOT FOUND");
});


app.listen(3000, () => console.log("Server listening on port 3000"));

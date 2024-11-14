require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5500/front_end/index.html',
    credentials: true
}));

app.use(express.json());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
}));
const authMiddleware=require('./middleware/auth');


app.get('/api/home', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to SevaDrive, the Ambulance Booking System!' });
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

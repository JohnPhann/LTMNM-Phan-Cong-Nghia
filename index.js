require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require("express-session");
// const flash = require("express-flash");
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3008;


mongoose.connect('mongodb+srv://nghiapchpo:123123123@cluster0.ohklk5c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: "your-secret-key",  // Change to a strong secret key
    resave: false,
    saveUninitialized: true
}));

// app.use(flash());


app.set('views', path.join(__dirname, 'src', 'views')); 
app.set('view engine', 'ejs');

// Import router
const homeRoutes = require('./src/routes/homeRoutes');
const userRoutes = require('./src/routes/userRoutes'); 
const userRoutesApi = require('./src/routes/api/user'); 
const productRoutes = require('./src/routes/productRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
// Sử dụng router
app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/bookings', bookingRoutes);
app.use('/category', categoryRoutes);


app.use('/api/users', userRoutesApi);

// Chạy server
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});

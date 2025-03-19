require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require("express-session");
const flash = require("express-flash");

const app = express();
const PORT = process.env.PORT || 3008;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "your-secret-key",  // Change to a strong secret key
    resave: false,
    saveUninitialized: true
}));

app.use(flash());


app.set('views', path.join(__dirname, 'src', 'views')); 
app.set('view engine', 'ejs');

// Import router
const homeRoutes = require('./src/routes/homeRoutes');
const userRoutes = require('./src/routes/userRoutes'); 
const productRoutes = require('./src/routes/productRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');

// Sử dụng router
app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/bookings', bookingRoutes);



// Chạy server
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});

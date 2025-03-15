require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3008;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('views', path.join(__dirname, 'src', 'views'));  // ✅ Chỉnh lại đúng thư mục views
app.set('view engine', 'ejs');

// Import router
const homeRoutes = require('./src/routes/homeRoutes');
const userRoutes = require('./src/routes/userRoutes'); // ✅ Đảm bảo file đúng tên
const productRoutes = require('./src/routes/productRoutes');

// Sử dụng router
app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Chạy server
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});

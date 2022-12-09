const express = require("express");
const colors = require('colors');
const dotenv = require("dotenv").config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const path = require("path");
const PORT = process.env.PORT || 8080;

//Initialize database connection
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API routes
app.use('/api/restaurants', require('./routes/restaurantRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
//Error middleware
app.use(errorHandler);

// port connection
app.listen(PORT, 3000, function () {
	console.log("Server running at port=" + PORT);
});

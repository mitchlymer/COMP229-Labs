const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();

const connectDB = require('./config/db');
const serviceRoutes = require('./routes/service.route');
const projectRoutes = require('./routes/project.route');
const referenceRoutes = require('./routes/reference.route');
const userRoutes = require('./routes/user.route');

const app = express();

connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Portfolio Backend Running');
});

app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/references', referenceRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    next(createError(404, 'Resource not found'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
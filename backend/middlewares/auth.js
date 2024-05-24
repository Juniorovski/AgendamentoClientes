const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const secret = process.env.SECRET_TOKEN;

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ status: 'error', detail: 'Please add all fields.' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ status: 'error', detail: 'Invalid credentials.' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            return res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({ status: 'error', detail: 'Invalid user data.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', detail: 'Internal Server Error', msg: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 'error', detail: 'Please add all fields.' });
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            return res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            return res.status(401).json({ status: 'error', detail: 'Invalid credentials.' });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', detail: 'Internal Server Error' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ status: 'error', detail: 'Internal Server Error' });
    }
};


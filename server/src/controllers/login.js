const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const createHttpError = require('http-errors');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return next(createHttpError(401, "Invalid credentials"));
        }

        // Compare the provided password with the stored hash
        const correctPass = await bcrypt.compare(password, user.password);

        if (!correctPass) {
            return next(createHttpError(401, "Invalid password"));
        }

        // Sign the token and set it in the cookie
        jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Optional: add token expiration
            (err, token) => {
                if (err) return next(createHttpError(500, "Error signing the token"));
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                }).json(user);
            }
        );
    } catch (error) {
        console.error("Error logging in user:", error);
        next(createHttpError(500, "An unexpected error occurred"));
    }
};

module.exports = loginUser;

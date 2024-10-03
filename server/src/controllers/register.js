const User = require("../models/User");
const createHttpError = require("http-errors");
const bcrypt = require("bcryptjs");

const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(createHttpError(400, "Name, email, or password are missing."));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return next(createHttpError(400, "The email address is already in use."));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        if (error.code === 11000) {
            return next(createHttpError(400, "The email address is already in use."));
        }
        next(createHttpError(500, "An unexpected error occurred."));
    }
};

module.exports = createUser;

const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const { mongoose } = require("mongoose");

const test = (req, res) => {
    res.json("test working fine");
};

const regiterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check if name was entered
        if (!name) {
            return res.json({
                error: "Name is required",
            });
        }

        //check for password
        if (!password || password.length < 6) {
            return res.json({
                error: "Password is required and should be at least 6 character",
            });
        }

        //check email
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email is already in use",
            });
        }

        const hashedpassword = await hashPassword(password);

        //Register user in db
        const user = await User.create({
            name,
            email,
            password: hashedpassword,
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: "No user found",
            });
        }

        //check password
        const match = await comparePassword(password, user.password);

        if (match) {
            //web token generation or cookie
            jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json(user);
                }
            );
        }
        if (!match) {
            res.json({
                error: "Invalid Password or Email",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const getUser = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

module.exports = {
    test,
    regiterUser,
    loginUser,
    getUser,
};

import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("User created successfully!");
    }
    catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        
        if (!user) 
            return next(createError(404, "User not found!"));

        const isCOrrect = bcrypt.compareSync(req.body.password, user.password);
        
        if (!isCOrrect) 
            return next(createError(400, "Invalid credentials!"));

        const token = jwt.sign({
            id: user._id, // We can use any parameter but as _id is unique for each user so using that
            isSeller: user.isSeller,
        },
            process.env.JWT_KEY
        );

        const { password, ...info } = user._doc;
        res.
        cookie("accessToken", token, {
            httpOnly: true,
        })
        .status(200)
        .send(info);

    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res) => {
    res
      .clearCookie("accessToken", {
        sameSite: "none", // Because our frontend and backend are running on different ports
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
  };
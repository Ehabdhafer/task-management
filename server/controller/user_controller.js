const { users } = require("../models/user_model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const schema = Joi.object({
      username: Joi.string().min(3).max(25).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&!])[A-Za-z\\d@#$%^&!]{8,30}$"
          )
        )
        .required(),
    });

    const validate = schema.validate({
      username,
      email,
      password,
    });

    if (validate.error) {
      return res.status(400).json({ error: validate.error.details });
    }

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new users({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const payload = {
      username,
      email,
      user_id: newUser.id,
    };

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      validate,
      message: "User added successfully",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add");
  }
};

// -------------------------------------------------------------------------------------------

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Email is invalid" });
      return;
    }

    const storedHashedPassword = user.password;

    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!passwordMatch) {
      res.status(400).json({ message: "Password is invalid" });
      return;
    }

    const payload = {
      username: user.username,
      user_id: user.id,
      email: user.email,
    };

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      message: "Successfully Login",
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to Authenticate");
  }
};

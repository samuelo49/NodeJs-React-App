// backend/models/user.js

const mongoose = require("mongoose");
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  isConfirmed: { type: Boolean, default: false },
  token: { type: String },
});

const User = mongoose.model("user", userSchema);

// Joi package is used to validate the schema 
const validate = (user) => {
   const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return schema.validate(user);
  };
  
  module.exports = { User, validate };
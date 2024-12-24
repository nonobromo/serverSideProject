const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true, minlength: 2, maxlength: 255 },
    middle: { type: String, required: true, minlength: 2, maxlength: 255 },
    last: { type: String, required: true, minlength: 2, maxlength: 255 },
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  phone: { type: String, required: true, minlength: 9, maxlength: 10 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 255,
  },
  password: { type: String, required: true, minlength: 6, maxlength: 1024 },
  image: {
    url: { type: String, required: true, minlength: 14 },
    alt: { type: String, required: true, minlength: 2 },
  },
});

const User = mongoose.model("User", userSchema, "users");

function validateUserSchema(user) {
  const schema = Joi.object({
    name: Joi.object({
      first: Joi.string().min(2).max(255).required(),
      middle: Joi.string().min(2).max(255).required(),
      last: Joi.string().min(2).max(255).required(),
    }).required(),
    isBusiness: Joi.boolean().required(),
    phone: Joi.string().min(9).max(10).required(),
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
    image: Joi.object({
      url: Joi.string().min(14).required(),
      alt: Joi.string().min(2).required(),
    }).required(),
  });

  return schema.validate(user);
}

module.exports = { User, validateUserSchema };

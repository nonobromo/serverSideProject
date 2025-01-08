const mongoose = require("mongoose");
const Joi = require("joi");
const passwordRegax = require("../regax")

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true, minlength: 2, maxlength: 256 },
    middle: { type: String, maxlength: 256, default: "" },
    last: { type: String, required: true, minlength: 2, maxlength: 256 },
  },
  phone: { type: String, required: true, minlength: 9, maxlength: 11 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  password: { type: String, required: true, minlength: 8 },
  image: {
    url: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
    alt: { type: String, maxlength: 256, default: "profile image" },
  },
  address: {
    state: { type: String, maxlength: 256, default: "" },
    country: { type: String, required: true, minlength: 2, maxlength: 256 },
    city: { type: String, required: true, minlength: 2, maxlength: 256 },
    street: { type: String, required: true, minlength: 2, maxlength: 256 },
    houseNumber: { type: Number, required: true, min: 2, max: 256 },
    zip: { type: String, required: true, min: 2, max: 256 },
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema, "users");

function validateUserSchema(user) {
  const schema = Joi.object({
    name: Joi.object({
      first: Joi.string().min(2).max(256).required(),
      middle: Joi.string().allow("").min(2).max(256),
      last: Joi.string().min(2).max(256).required(),
    }).required(),
    phone: Joi.string().min(9).max(11).required(), 
    email: Joi.string().min(5).required(),
    password: Joi.string()
      .pattern(passwordRegax)
      .required()
      .messages({
        "string.pattern.base": 
          "Your password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-).",
      }),
    image: Joi.object({
      url: Joi.string().allow("").min(14),
      alt: Joi.string().allow("").min(2).max(256),
    }),
    address: Joi.object({
      state: Joi.string().allow("").min(2).max(256),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(2).max(256).required(),
      zip: Joi.string().min(2).max(256).required(),
    }).required(),
    isBusiness: Joi.boolean().required(),
  });

  return schema.validate(user);
}


function validateUserEditSchema(user) {
  const schema = Joi.object({
    name: Joi.object({
      first: Joi.string().max(256).required(),
      middle: Joi.string().allow("").max(256),
      last: Joi.string().min(2).max(255).required(),
    }).required(),
    phone: Joi.string().min(9).max(11).required(),
    email: Joi.string().min(5).required(),
    image: Joi.object({
      url: Joi.string().min(14).allow(""),
      alt: Joi.string().min(2).max(256).allow(""),
    }),
    address: Joi.object({
      state: Joi.string().allow("").max(256),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(2).max(256).required(),
      zip: Joi.number().min(2).max(256).required(),
    }).required(),
  });

  return schema.validate(user);
}


module.exports = { User, validateUserSchema, validateUserEditSchema };

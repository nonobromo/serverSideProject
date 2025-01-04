const mongoose = require("mongoose");
const Joi = require("joi");

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
  password: { type: String, required: true, minlength: 6, maxlength: 1024 },
  image: {
    url: { type: String,  minlength: 14 },
    alt: { type: String,  minlength: 2, maxlength: 256 },
  },
  address: {
    state: {type: String, maxlength: 256, default: ""},
    country: {type: String, required: true, minlength: 2, maxlength: 256},
    city: {type: String, required: true, minlength: 2,maxlength: 256},
    street: {type: String, required: true, minlength: 2,maxlength: 256},
    houseNumber: {type: Number, required:true, min: 2,max: 256},
    zip: {type: Number, required:true, min: 2,max: 256}
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  isAdmin: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now()}
});

const User = mongoose.model("User", userSchema, "users");

function validateUserSchema(user) {
  const schema = Joi.object({
    name: Joi.object({
      first: Joi.string().max(256).required(),
      middle: Joi.string().allow("").max(256),
      last: Joi.string().min(2).max(255).required(),
    }).required(),
    phone: Joi.string().min(9).max(11).required(),
    email: Joi.string().min(5).required(),
    password: Joi.string().min(6).max(20).required(),
    image: Joi.object({
      url: Joi.string().min(14),
      alt: Joi.string().min(2).max(256),
    }),
    address: Joi.object({
      state: Joi.string().allow("").max(256),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(2).max(256).required(),
      zip: Joi.number().min(2).max(256).required(),
    }).required(),
    isBusiness: Joi.boolean().required(),
    isAdmin: Joi.boolean()
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
      url: Joi.string().min(14),
      alt: Joi.string().min(2).max(256),
    }),
    address: Joi.object({
      state: Joi.string().allow("").max(256),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(2).max(256).required(),
      zip: Joi.number().min(2).max(256).required(),
    }).required(),
    isBusiness: Joi.boolean().required(),
    isAdmin: Joi.boolean()
  });

  return schema.validate(user);
}


module.exports = { User, validateUserSchema, validateUserEditSchema };

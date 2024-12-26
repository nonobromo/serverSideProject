const mongoose = require("mongoose");
const Joi = require("joi");

const cardSchema = mongoose.Schema({
  title: { type: String, required: true, minlength: 2, maxlength: 255 },
  subtitle: { type: String, required: true, minlength: 2, maxlength: 255 },
  description: { type: String, required: true, minlength: 2, maxlength: 255 },
  phone: { type: String, required: true, minlength: 9, maxlength: 10 },
  email: { type: String, required: true, minlength: 6, maxlength: 1024 },
  web: { type: string, required: true, minlength: 20, maxlength: 1024 },
  image: {
    url: { type: string, required: true, minlength: 20, maxlength: 1024 },
    alt: { type: string, required: true, minlength: 2, maxlength: 255 },
  },
  address: {
    state: { type: String, minlength: 1 },
    country: { type: String, required: true, minlength: 2, maxlength: 256 },
    city: { type: String, required: true, minelgtnh: 2, maxlength: 256 },
    street: { type: String, required: true, minlength: 2, maxlength: 256 },
    houseNumber: {
      type: Number,
      required: true,
      minelength: 2,
    },
    zip: { type: String, requried: true, minlength: 2 },
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Card = mongoose.Model("Card", cardSchema, "cards");

function validateCardSchema(card) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    subtitle: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(2).max(255).required(),
    phone: Joi.string().min(9).max(10).required(),
    email: Joi.string().min(6).max(255).required(),
    web: Joi.string().min(20).max(255).required(),
    image: Joi.object({
      url: Joi.string().min(20).max(1024).required(),
      alt: Joi.string().min(2).max(1024).required(),
    }).required(),
    address: Joi.object({
      state: Joi.string().min(2).max(255).required(),
      country: Joi.string().min(2).max(255).required(),
      city: Joi.string().min(2).max(255).required(),
      street: Joi.string().min(2).max(255).required(),
      houseNumber: Joi.number().min(2).required(),
      zip: Joi.string().min(1).required(),
    }).required(),
  });

  return schema.validate(card);
}

module.exports = { Card, validateCardSchema };

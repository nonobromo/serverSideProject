const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2, maxlength: 255 },
  subtitle: { type: String, required: true, minlength: 2, maxlength: 256 },
  description: { type: String, required: true, minlength: 2, maxlength: 1024 },
  phone: { type: String, required: true, minlength: 9, maxlength: 11 },
  email: { type: String, required: true, minlength: 6 },
  web: { type: String, minlength: 14 },
  image: {
    url: { type: String, required: true, minlength: 14 },
    alt: { type: String, required: true, minlength: 2, maxlength: 256 },
  },
  address: {
    state: { type: String },
    country: { type: String, required: true,  },
    city: { type: String, required: true,  },
    street: { type: String, required: true, },
    houseNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    zip: { type: Number, min: 1 },
  },
  bizNumber: {
    type: Number,
    required: true,
    min: 100,
    max: 9_999_999_999,
    unique: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: { type: [String], default: [] },
});

const Card = mongoose.model("Card", cardSchema, "cards");

async function generateRandomBizNumber() {
  while (true) {
    const random = _.random(100, 9_999_999_999);
    const card = await Card.findOne({ bizNumber: random });
    if (!card) {
      return random;
    }
  }
}

function validateCardSchema(card) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string().min(9).max(11).required(),
    email: Joi.string().min(5).required(),
    web: Joi.string().min(14),
    image: Joi.object({
      url: Joi.string().min(20).max(1024).required(),
      alt: Joi.string().min(2).max(1024).required(),
    }).required(),
    address: Joi.object({
      state: Joi.string(),
      country: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.number().min(1).required(),
      zip: Joi.number().min(1).allow(""),
    }).required(),
  });

  return schema.validate(card);
}

module.exports = { Card, validateCardSchema, generateRandomBizNumber };

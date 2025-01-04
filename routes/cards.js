const express = require("express");
const authMW = require("../middleware/auth");
const businessAuth = require("../middleware/businessAuth");
const router = express.Router();
const {
  validateCardSchema,
  Card,
  generateRandomBizNumber,
} = require("../models/cards");
const adminAuth = require("../middleware/adminAuth");

router.patch("/update/:id", [authMW, adminAuth], async (req,res)=>{
  try{
    const card =await Card.findOne({_id: req.params.id})

    if (!card){
      res.status(400).send("The requested card was not found");
      return
    }
     const newRandomNumber = await generateRandomBizNumber()

     const doesNumberExist = await Card.findOne({bizNumber: newRandomNumber})

     if (doesNumberExist){
      res.status(400).send("Biz Number already exists");
      return
     }

     const updateOperation = await Card.findOneAndUpdate({_id: req.params.id}, {$set: {bizNumber: newRandomNumber}}, {returnDocument: "after"})
    res.send(updateOperation)
  }
  catch(err){
    res.status(500).send(err)
  }
})

router.patch("/:id", [authMW], async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params.id });
    if (!card) {
      return res.status(404).send("The requested card was not found");
    }

    const updateOperation = card.likes.includes(req.user._id)
      ? { $pull: { likes: req.user._id } }
      : { $push: { likes: req.user._id } };

    const updatedCard = await Card.findOneAndUpdate(
      { _id: req.params.id },
      updateOperation,
      { returnDocument: "after" }
    );

    res.send(updatedCard);
  } catch (err) {
    res.status(500).send("An error occurred while updating the card");
  }
});

router.delete("/:id", [authMW], async (req, res) => {
  try {
    const cardId = req.params.id;

    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).send("The requested card was not found");
    }

    if (card.user_id.toString() !== req.user._id && !req.user.isAdmin) {
      return res
        .status(403)
        .send("You must be the creator of this card or an admin to delete it");
    }

    const deletedCard = await Card.findByIdAndDelete(cardId);

    res.send(deletedCard);
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).send("Internal server error");
  }
});

router.put("/:id", [authMW], async (req, res) => {
  const { error } = validateCardSchema(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const card = await Card.findOneAndUpdate({ _id: req.params.id }, req.body, {
    returnDocument: "after",
  });

  if (card.user_id.toString() !== req.user._id) {
    res.status(400).send("Only the business owner can edit this card");
    return;
  }
  res.send(card);
});

router.get("/my-cards", authMW, async (req, res) => {
  const myCards = await Card.find({ user_id: req.user._id });

  res.json(myCards);
});

router.get("/:id", async (req, res) => {
  const card = await Card.find({ _id: req.params.id });

  res.send(card);
});

router.get("/", async (req, res) => {
  const cards = await Card.find();

  res.json(cards);
});

router.post("/", [authMW, businessAuth], async (req, res) => {
  const { error } = validateCardSchema(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const card = await new Card({
    ...req.body,
    user_id: req.user._id,
    bizNumber: await generateRandomBizNumber(),
  }).save();

  res.json(card);
});

module.exports = router;

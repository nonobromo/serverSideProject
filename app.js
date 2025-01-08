require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(cors());
const PORT = 4000;

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const cardsRouter = require("./routes/cards");
const { User } = require("./models/users");
const { initialusers } = require("./inititalData/initialusers");
const { Card, generateRandomBizNumber } = require("./models/cards");
const { initialCards } = require("./inititalData/initialCards");
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/cards", cardsRouter);

const local = process.env.COMPASS_URL;
const cloud = process.env.ATLAS_URL;

const connectionString = process.env.ENVIRONMENT === "LOCAL" ? local : cloud;

connect();

async function connect() {
  try {
    await mongoose.connect(connectionString).then(async () => {
      const dbUsers = await User.find();
      const dbCards = await Card.find();

      initialusers.forEach(async (user) => {
        if (dbUsers.find((dbuser) => dbuser.email === user.email)) {
          return;
        }
        const newUser = new User(user);
        newUser.password = await bcrypt.hash(newUser.password, 12);
        await newUser.save();
      });

      initialCards.forEach(async (card) => {
        if (dbCards.length >= 3) {
          return;
        }

        const newCard = new Card({
          ...card,
          bizNumber: await generateRandomBizNumber(),
        });
        await newCard.save();
      });

      console.log("connected to the database");
      app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
      });
    });
  } catch (e) {
    console.log("failed to connect to the database", e.message);
  }
}

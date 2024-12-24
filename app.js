const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 4000;

const usersRouter = require("./routes/users");
app.use(express.json());
app.use("/api/users", usersRouter);

connect();

async function connect() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://noamab22:p2kspCA3Io0669uY@cluster0.m2gxd.mongodb.net/projectAPI"
      )
      .then(() => {
        console.log("connected to the database");
        app.listen(PORT, () => {
          console.log(`listening on port ${PORT}`);
        });
      });
  } catch (e) {
    console.log("failed to connect to the database", e.message);
  }
}

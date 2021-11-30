/// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const EntrySchema = require("./schema/dict");

const { dispatchWords, dob } = require("./nexus");

mongoose.connect(
  "mongodb+srv://NemGreene:12345@cluster0.1a7yh.mongodb.net/spamBot?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

app.post("/update", async ({ body: { sender, subject } }, res) => {
  // console.log(sender, subject);
  dispatchWords([...sender, ...subject]);
  res.send("Hello world");
});

app.post("/init", async ({ body: { sender, subject } }, res) => {
  let alph = "abcdefghijklmnopqrstuvwxyz".split("");
  alph.forEach(async (v, i) => {
    let insert = await new EntrySchema({
      key: v,
      entries: [{ word: "test", number: 1000, head: true, spam: true }],
    });
    await insert.save();
  });
  // let insert = new EntrySchema({
  //   key: "misc", // String is shorthand for {type: String}
  //   entries: [
  //     { word: "test1", number: 0, head: true, spam: true },
  //     { word: "test2", number: 0, head: true, spam: true },
  //     { word: "test3", number: 0, head: true, spam: true },
  //     { word: "test4", number: 0, head: true, spam: true },
  //     { word: "test5", number: 0, head: true, spam: true },
  //     { word: "test6", number: 0, head: true, spam: true },
  //     { word: "test7", number: 0, head: true, spam: true },
  //     { word: "test8", number: 0, head: true, spam: true },
  //     { word: "test9", number: 0, head: true, spam: true },
  //     { word: "test10", number: 0, head: true, spam: true },
  //     { word: "test11", number: 0, head: true, spam: true },
  //     { word: "test12", number: 0, head: true, spam: true },
  //     { word: "test13", number: 0, head: true, spam: true },
  //     { word: "test14", number: 0, head: true, spam: true },
  //   ],
  // });
  // await insert.save();

  res.send("Hello inti");
});

// starting the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("Database connected!");
});

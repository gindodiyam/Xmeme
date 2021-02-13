const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//Schema definition for memes
const memeSchema = mongoose.Schema({
  name: "",
  caption: "",
  url: "",
});

//Mapping memeSchema to a 'Meme' class
const Meme = mongoose.model("Meme", memeSchema);

//Get requests
router.get("/", async (req, res) => {
  const memes = await Meme.find().limit(100);
  res.send(memes);
});

router.get("/:id", async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) return res.status(404).send("meme not found");
    res.send(meme);
  } catch (err) {
    return res.status(404).send("Meme not found");
  }
});

//Post requests
router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.required(),
    caption: Joi.required(),
    url: Joi.required().allow(""),
  });
  const result = schema.validate(req.body);
  console.log(result);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let meme = new Meme({
    name: req.body.name,
    caption: req.body.caption,
    url: req.body.url,
  });
  meme = await meme.save();
  res.send(meme);
});

//Patch Request
router.patch("/:id", (req, res) => {
  Meme.findById(req.params.id, (err, meme) => {
    if (req.body._id) {
      delete req.body._id;
    }
    for (let i in req.body) {
      if (req.body[i].length > 0) meme[i] = req.body[i];
    }
    meme.save();
    res.json(meme);
  });
});

//Delete requests
router.delete("/:id", async (req, res) => {
  //Lookup
  try {
    const meme = await Meme.findByIdAndRemove(req.params.id);
    if (!meme) return res.status(404).send("Meme not found");
    res.send(meme);
  } catch (err) {
    return res.status(404).send("Meme not found");
  }
});

module.exports = router;

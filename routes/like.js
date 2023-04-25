const router = require("express").Router();
const Like = require("../models/List");
const verify = require("../verifyToken");

//Add
router.post("/", verify, async (req, res) => {
  if (req.user.id) {
    const newLike = new Like(req.body);
    try {
      const savedLike = await newLike.save();
      res.status(201).json(savedLike);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

//Remove
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id) {
    try {
      await Like.findByIdAndDelete(req.params.id);
      res.status(201).json("The movie has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

//GET Movies
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let like = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        like = await Like.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        like = await Like.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      like = await Like.aggregate([{ $sample: { size: 30 } }]);
    }
    res.status(200).json(like);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
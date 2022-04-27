const express = require("express");
const router = express.Router();
const showData = require("../data/apiCall");

router.post("/", async (req, res) => {
  try {
    const getID = await showData(req.body);
    console.log(getID);
    res.send(getID);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require('../utils/multer.utils')

const { create,findAll,deleteConstat,update} = require("../controllers/Constats.controller");

router.post("/create", upload.any("image"),create);
router.get("/findAll", findAll);
router.delete("/deleteAll", deleteConstat);
router.patch("/update/:id", update);
module.exports = router;
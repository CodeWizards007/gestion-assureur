const express = require("express");
const router = express.Router();
const upload = require('../utils/multer.utils')

const { create,findAll,deleteConstat,update,findbyexpert,find} = require("../controllers/Constats.controller");

router.post("/create", upload.array("images",10),create);
router.get("/findAll", findAll);
router.delete("/deleteAll", deleteConstat);
router.put("/update", update);
router.get("/findByExpert/:id", findbyexpert);
router.get("/find/:id", find);

module.exports = router;
const express = require("express");
const router = express.Router();

const { create,findAll,deleteConstat,update} = require("../controllers/Constats.controller");

router.post("/create", create);
router.get("/findAll", findAll);
router.delete("/deleteAll", deleteConstat);
router.patch("/update/:id", update);
module.exports = router;
const express = require("express");
const requestMethod = require("../middleware/RequestMethod");
const { create,findAll,findOne,update} = require("../controllers/Assureur.controller.js");
const router = express.Router();


router.post("/create", requestMethod,create);
router.get("/findAll", requestMethod,findAll);
router.get("/findOne/:id", requestMethod,findOne);
router.put("/update/:id", requestMethod,update);

module.exports = router;

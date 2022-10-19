const express = require("express");
const requestMethod = require("../middleware/RequestMethod");
const { findAll,findOne,create,update,deleteDevis} = require("../controllers/Devis.controller");
const router = express.Router();

router.post("/create/:idConstat", requestMethod,create);
router.get("/findAll", requestMethod,findAll);
router.get("/findOne/:id", requestMethod,findOne);
router.patch("/update/:id", requestMethod,update);
router.delete("/delete/:id", requestMethod,deleteDevis);


module.exports = router;
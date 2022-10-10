const express = require("express");
const route = express.Router();
const requestMethod = require("../middleware/RequestMethod");
const { create,findAll,findOne,update} = require("../controllers/Assureur.controller.js");



route.post("/create", requestMethod,create);
route.get("/findAll", requestMethod,findAll);
route.get("/findOne/:id", requestMethod,findOne);
route.put("/update/:id", requestMethod,update);

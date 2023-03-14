const express = require('express');
const { register, logIn, viewData } = require('../controller/userController');
const router = express.Router();
router.get("/view",viewData)
router.post("/register",register)
router.post("/login",logIn)

module.exports = router;
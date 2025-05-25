const express = require("express");
const {body} = require("express-validator");
const router = express.Router();
const authController = require ("../controllers/authController");
const { route } = require("../app");



// /api/auth/register

router.post(

    "/register",

    [
        body("name").notEmpty().withMessage("Kullanıcı adı zorunlu"),
        body("email").isEmail().withMessage("Geçerli bir mail adresi girin"),
        body("password").isLength({min:6}).withMessage("Şifre en az 6 karakter olmalı"),
        body("birthDate").notEmpty()
      .withMessage("Doğum tarihi zorunludur").isISO8601().toDate().withMessage("Geçerli bir doğum tarihi girin (YYYY-MM-DD)")
    ],
    authController.register
        
);
    


// /api/auth/login

router.post(
    "/login",
    [ 
        body("email").isEmail().withMessage("Geçerli bir mail adresi girin"),
         body("password").exists().withMessage("Şifre zorunlu"),
    ],
    authController.login
    
);

module.exports= router;
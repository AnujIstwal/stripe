const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
    test,
    regiterUser,
    loginUser,
    getUser,

} = require("../controllers/authControllers");

//middle-ware

router.use(
    cors({
        credentials: true,
        origin: "https://richpanel-stripe.vercel.app",
    })
);

router.get("/", test);
router.post("/register", regiterUser);
router.post("/login", loginUser);
router.get("/profile", getUser);


module.exports = router;

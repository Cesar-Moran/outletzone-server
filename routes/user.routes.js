const { Router } = require("express");
const register = require("../controllers/user.controllers");
const router = Router();

router.post("/api/register", register.register);
router.post("/api/login", register.login);

module.exports = router;

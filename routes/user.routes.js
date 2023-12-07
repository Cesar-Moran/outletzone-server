const { Router } = require("express");
const register = require("../controllers/user.controllers");
const router = Router();

router.post("/api/register", register.register);
router.post("/api/login", register.login);
router.post("/api/acceptRequest/:id", register.acceptRequest);
router.get("/api/registerRequests", register.registerRequests);
router.delete("/api/denieRequest/:id", register.denieRequest);

module.exports = router;

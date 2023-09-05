const express = require("express");
const router = express.Router();
const { register, login, getUsers, changeBizStatus, deleteUser, editUser, getUser } = require("../controllers/usersController");
const auth = require("../../auth/authService");

router.post("/", register);
router.post("/login", login);
router.get("/", auth, getUsers);
router.get("/:userId", auth, getUser);
router.put("/:userId", auth, editUser);
router.patch("/:userId", auth, changeBizStatus);
router.delete("/:userId", auth, deleteUser);


module.exports = router;

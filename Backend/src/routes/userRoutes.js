const express = require("express");
const {
  listUsers,
  createUser,
  deleteUser,
  exportUsers,
} = require("../controllers/userController");
const {
  validateCreateUser,
  validateExportUsers,
} = require("../middlewares/userValidation");

const router = express.Router();

router.get("/", listUsers);
router.post("/", validateCreateUser, createUser);
router.delete("/:id", deleteUser);
router.post("/export", validateExportUsers, exportUsers);

module.exports = router;

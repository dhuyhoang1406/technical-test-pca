const userService = require("../services/userServices");

const listUsers = async (req, res) => {
  try {
    const users = await userService.listUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to fetch users.",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      ...user,
      message: "User created successfully.",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to create user.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to delete user.",
    });
  }
};

const exportUsers = async (req, res) => {
  try {
    const csv = await userService.exportUsers(req.validatedUserIds);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="users-${Date.now()}.csv"`,
    );

    return res.status(200).send(csv);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to export users.",
    });
  }
};

module.exports = {
  listUsers,
  createUser,
  deleteUser,
  exportUsers,
};

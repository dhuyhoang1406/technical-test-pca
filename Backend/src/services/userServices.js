const { Op } = require("sequelize");
const { stringify } = require("csv-stringify/sync");
const { User } = require("../models");

const createAppError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const listUsers = async () => {
  return User.findAll({
    where: { deleted: false },
    attributes: ["id", "email", "firstName", "lastName"],
    order: [["createdAt", "DESC"]],
  });
};

const createUser = async (payload) => {
  const { firstName, lastName, email, password } = payload;

  try {
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      deleted: false,
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  } catch (error) {
    if (error?.name === "SequelizeUniqueConstraintError") {
      throw createAppError("Email already exists.", 409);
    }

    throw error;
  }
};

const deleteUser = async (id) => {
  const deletedUser = await User.findOne({
    where: { id },
  });

  if (!deletedUser) {
    throw createAppError("User not found.", 404);
  }
  deletedUser.deleted = true;
  await deletedUser.save();
};

const exportUsers = async (rawUserIds) => {
  const userIds = (rawUserIds || []).map((id) => String(id).trim()).filter(Boolean);

  const users = await User.findAll({
    where: {
      id: { [Op.in]: userIds },
      deleted: false,
    },
    attributes: ["id", "email", "firstName", "lastName"],
    order: [["createdAt", "DESC"]],
  });

  if (!users.length) {
    throw createAppError("No matching users found.", 404);
  }

  return stringify(
    users.map((user) => ({
      id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
    })),
    {
      bom: true,
      header: true,
      columns: ["id", "email", "first_name", "last_name"],
    },
  );
};

module.exports = {
  listUsers,
  createUser,
  deleteUser,
  exportUsers,
};

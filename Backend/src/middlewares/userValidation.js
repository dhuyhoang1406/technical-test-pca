const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isStrongPassword = (password) => {
  return typeof password === "string" && password.length >= 6;
};

const validateCreateUser = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body || {};

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "firstName, lastName, email and password are required.",
    });
  }

  if (!emailRegex.test(String(email).trim())) {
    return res.status(400).json({ message: "Email format is invalid." });
  }

  if (!isStrongPassword(password)) {
    return res
      .status(400)
      .json({ message: "Password must contain at least 6 characters." });
  }

  next();
};

const validateExportUsers = (req, res, next) => {
  const inputIds = Array.isArray(req.body?.userIds)
    ? req.body.userIds
    : typeof req.query?.ids === "string"
      ? req.query.ids.split(",")
      : [];

  const userIds = inputIds.map((id) => String(id).trim()).filter(Boolean);

  if (!userIds.length) {
    return res
      .status(400)
      .json({ message: "Please provide at least one user id." });
  }

  req.validatedUserIds = userIds;
  next();
};

module.exports = {
  validateCreateUser,
  validateExportUsers,
};

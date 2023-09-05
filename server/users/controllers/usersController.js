const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleError } = require("../../utils/handleErrors");
const { comparePassword } = require("../helpers/bcrypt");
const normalizeUser = require("../helpers/normalizeUser");
const loginValidation = require("../models/joi/loginValidation");
const registerValidation = require("../models/joi/registerValidation");
const User = require("../models/mongoose/User");

const register = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;

    const { error } = registerValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const isUserExistInDB = await User.findOne({ email });
    if (isUserExistInDB) throw new Error("User already registered");

    const normalizedUser = normalizeUser(user);

    const userForBD = new User(normalizedUser);
    const userFromDB = await userForBD.save();
    res.send(userFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;
    const { error } = loginValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const userInDb = await User.findOne({ email });
    if (!userInDb)
      throw new Error("Authentication Error: Invalid email or password");

    const isPasswordValid = comparePassword(user.password, userInDb.password);
    if (!isPasswordValid)
      throw new Error("Authentication Error: Invalid email or password");

    const { _id, isBusiness, isAdmin } = userInDb;
    const token = generateAuthToken({ _id, isBusiness, isAdmin });

    res.send(token);
  } catch (error) {
    const isAuthError =
      error.message === "Authentication Error: Invalid email or password";

    return handleError(
      res,
      isAuthError ? 403 : 500,
      `Mongoose Error: ${error.message}`
    );
  }
};

const getUsers = async (req, res) => {
  try {
    const user = req.user;
    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );
    const users = await User.find({}, { password: 0, a: 0 });
    Promise.resolve(users);
    return res.send(users);
  } catch (error) {
    handleError(res, 500, `Mongoose errorL ${error.message}`);
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = req.user;
    if (userId != user._id && !user.isAdmin) {
      const message =
        "Authorization Error: You must be an admin type user or the registered user to see this user details";
      return handleError(res, 403, message);
    }

    const userDetails = await User.findById(userId, { password: 0, a: 0 });
    if (!userDetails) throw new Error("cannot find this user in database");
    Promise.resolve(userDetails);
    return res.send(userDetails);
  } catch (error) {
    handleError(res, 500, `Mongoose errorL ${error.message}`);
  }
};

const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = req.user;
    const editTheUser = req.body;

    if (user._id != userId)
      throw new Error("only the registered user can edit his details");

    const { error } = userUpdateValidation(editTheUser);
    if (error)
      return handleError(res, 400, `Joi error: ${error.details[0].message}`);

    const normalizedEditedUser = normalizeEditUser(editTheUser);
    const newUser = await User.findByIdAndUpdate(userId, normalizedEditedUser, {
      new: true,
    });

    Promise.resolve(newUser);
    return res.send(newUser);
  } catch (error) {
    handleError(res, 500, `Mongoose errorL ${error.message}`);
  }
};

const changeBizStatus = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;

    if (!user.isAdmin)
      throw new Error("only admin can change business status of users ");

    const line = [{ $set: { isBusiness: { $not: "$isBusiness" } } }];
    const newStatusUser = await User.findByIdAndUpdate(userId, line, {
      new: true,
    }).select(["-password", "-a"]);

    if (!newStatusUser)
      throw new Error(
        "Could not update this user isBusiness status because a user with this ID cannot be found in the database"
      );
    Promise.resolve(newStatusUser);
    res.send(newStatusUser);
  } catch (error) {
    handleError(res, 500, `Mongoose errorL ${error.message}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;
    if (user._id !== userId && !user.isAdmin)
      throw new Error("only registered user or admin can delete an account");

    const userToDelete = await User.findByIdAndDelete(userId, {
      password: 0,
      a: 0,
    });

    if (!userToDelete)
      throw new Error(
        "Could not delete this user because a user with this ID cannot be found in the database"
      );
    Promise.resolve(userToDelete);
    res.send(userToDelete);
  } catch (error) {
    handleError(res, 500, `Mongoose errorL ${error.message}`);
  }
};

exports.register = register;
exports.login = login;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.editUser = editUser;
exports.changeBizStatus = changeBizStatus;
exports.deleteUser = deleteUser;

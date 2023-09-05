const normalizeCard = require("../cards/helpers/normalizeCards");
const validateCard = require("../cards/models/joi/validateCard");
const Card = require("../cards/models/mongoose/Card");
const normalizeUser = require("../users/helpers/normalizeUser");
const validateUser = require("../users/models/joi/validateUser");
const User = require("../users/models/mongoose/User");
const data = require("./initialData.json");
const chalk = require("chalk");

const generateInitialCards = async () => {
  const { cards } = data;
  const userId = "649d3238bac95e85fa0f0546";
  cards.forEach(async (card) => {
    try {
      const { error } = validateCard(card);
      if (error) throw new Error(`joi error: ${error.details[0].message}`);

      const normalizedCard = await normalizeCard(card, userId);
      const cardToDB = new Card(normalizedCard);
      await cardToDB.save();
      console.log(
        chalk.greenBright(`generate card ${card.title} succussfully`)
      );
    } catch (error) {
      console.log(chalk.redBright(`initial data error:${error.message}`));
    }
  });
};

const generateInitialUsers = async () => {
  const { users } = data;

  users.forEach(async (user) => {
    try {
      const { email } = user;
      const { error } = validateUser(user);
      if (error)
        return handleError(res, 400, `Joi error: ${error.details[0].message}`);

      const isUserExist = await User.findOne({ email });
      if (isUserExist) throw new Error("user is already exist");

      const normalizedUser = normalizeUser(user);

      const userToDB = new User(normalizedUser);
      await userToDB.save();
      console.log(
        chalk.greenBright(`generate card ${user.name.first} succussfully`)
      );
    } catch (error) {
      console.log(chalk.redBright(`initial data error:${error.message}`));
    }
  });
};

exports.generateInitialCards = generateInitialCards;
exports.generateInitialUsers = generateInitialUsers;

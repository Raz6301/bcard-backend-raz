const lodash = require("lodash");
const Card = require("../models/mongoose/Card");
const { handleError } = require("../../utils/handleErrors");

const generateBizNumber = async () => {
  try {
    const random = lodash.random(1_000_000, 9_000_000);
    const card = await Card.findOne(
      { bizNumber: random },
      { bizNumber: 1, _id: 0 }
    );
    if (card) return generateBizNumber();
    // return Promise.resolve(random);
    return random;
  } catch (error) {
    return handleError(res, 500, `generateBizNumber Error: ${error.message}`);
  }
};

module.exports = generateBizNumber;

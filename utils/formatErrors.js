var _ = require("lodash");

module.exports = (e) => {
  if (
    e.name === "SequelizeValidationError" ||
    e.name === "SequelizeUniqueConstraintError"
  ) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    return e.errors.map((x) => _.pick(x, ["path", "message"]));
  }
  return e;
};

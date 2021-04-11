const ERRORS = {
  ReferenceError: 1,
  FormatError: 2,
  TypeError: 3,
  Mixed: 4,
};

const ERROR_MESSAGES = {
  REFERECE_ERROR: "ReferenceError: No value passed",
  DATE_FORMAT_ERROR:
    "FormatError: Date is not in correct format (correct format: YYYY-MM-DD)",
  TYPE_ERROR: "TypeError: Expecting integer input",
  NUMBER_FORMAT_ERROR: "FormatError: Number is not positive",
};

const isDate = (str) => {
  return (
    "string" === typeof str &&
    (dt = new Date(str)) &&
    !isNaN(dt) &&
    str === dt.toISOString().substr(0, 10)
  );
};

const getType = (elem) => {
  return Object.prototype.toString.call(elem).slice(8, -1);
};

const validateDate = (value) => {
  if (getType(value) === "Null" || getType(value) === "Undefined") {
    throw new Error(ERROR_MESSAGES.REFERECE_ERROR);
  }

  if (!isDate(value)) {
    throw new Error(ERROR_MESSAGES.DATE_FORMAT_ERROR);
  }
  return true;
};

const validateCount = (value) => {
  if (getType(value) === "Null" || getType(value) === "Undefined") {
    throw new Error(ERROR_MESSAGES.REFERECE_ERROR);
  }

  if (getType(value) !== "Number") {
    throw new Error(ERROR_MESSAGES.TYPE_ERROR);
  }

  if (value < 0) {
    throw new Error(ERROR_MESSAGES.NUMBER_FORMAT_ERROR);
  }
  return true;
};

module.exports = {
  isDate,
  validateCount,
  validateDate,
  getType,
  ERRORS,
};

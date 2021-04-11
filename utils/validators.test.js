const {
  isDate,
  validateDate,
  validateCount,
  getType,
} = require("./validators");

describe("test suite for 'isDate' validator", () => {
  it("isDate should return false for null", () => {
    expect(isDate(null)).toBeFalsy();
  });

  it("isDate should return false for any string", () => {
    expect(isDate("200")).toBeFalsy();
  });

  it("isDate should return false for any number", () => {
    expect(isDate(20)).toBeFalsy();
  });

  it("isDate should return true for valid date string", () => {
    expect(isDate("2020-06-11")).toBeTruthy();
  });
});

describe("test suite for 'validateDate' validator", () => {
  it("validateDate should throw  error for null", () => {
    expect(() => validateDate(null)).toThrow(Error);
  });

  it("validateDate should throw Error for incorrect date format", () => {
    expect(() => validateDate("xyz")).toThrow(Error);
  });

  it("validateDate should return 'true' for correct date format", () => {
    expect(validateDate("2021-04-04")).toBeTruthy();
  });
});

describe("test suite for 'validateCount' validator", () => {
  it("validateCount should throw  error for null", () => {
    expect(() => validateCount(null)).toThrow(Error);
  });

  it("validateCount should throw Error for non numeric values", () => {
    expect(() => validateCount("xyz")).toThrow(Error);
  });

  it("validateCount should throw Error for negative integer values", () => {
    expect(() => validateCount(-10)).toThrow(Error);
  });

  it("validateCount should return 'true' for positive integer value", () => {
    expect(validateCount(300)).toBeTruthy();
  });
});

describe("Test the getType method", () => {
  it("Should return 'Null' for null", () => {
    expect(getType(null)).toBe("Null");
  });

  it("Should return 'Object' for {}", () => {
    expect(getType({})).toBe("Object");
  });

  it("Should return 'Array' for []", () => {
    expect(getType([])).toBe("Array");
  });

  it("Should return 'Undefined' for undefined", () => {
    expect(getType(undefined)).toBe("Undefined");
  });
});

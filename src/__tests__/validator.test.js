import { Validator } from "../js/validator";

const validator = new Validator();

const mirCardNumber = "2200000000000053";
const visaCardNumber = "4485100873499922209";
const masterCardNumber = "5219869761203607";
const maestroCardNumber = "5038678255035998";
const amexCardNumber = "345286805727772";
const unknownCardNumber = "6391841242364884";
const invalidCardNumber = "4111111111111119";

test("check pay system", () => {
  expect(validator.checkPaySystem(mirCardNumber)).toBe("mir");
  expect(validator.checkPaySystem(visaCardNumber)).toBe("visa");
  expect(validator.checkPaySystem(masterCardNumber)).toBe("mastercard");
  expect(validator.checkPaySystem(maestroCardNumber)).toBe("maestro");
  expect(validator.checkPaySystem(amexCardNumber)).toBe("american-express");
  expect(validator.checkPaySystem(unknownCardNumber)).toBe("unknown");
});

test("validate card number", () => {
  expect(validator.isValidCheckDigit(mirCardNumber)).toBe(true);
  expect(validator.isValidCheckDigit(visaCardNumber)).toBe(true);
  expect(validator.isValidCheckDigit(masterCardNumber)).toBe(true);
  expect(validator.isValidCheckDigit(maestroCardNumber)).toBe(true);
  expect(validator.isValidCheckDigit(amexCardNumber)).toBe(true);
  expect(validator.isValidCheckDigit(unknownCardNumber)).toBe(true);
  expect(validator.isValidCheckDigit(invalidCardNumber)).toBe(false);
});

const validator = require("validator");
// import validator from './../node_modules/validator/es/index';

function ValidateUser(data) {
  const mandatoryField = ["firstName", "emailId", "password"];

  const IsAllowed = mandatoryField.every((k) =>Object.keys(data).includes(k));

  if (!IsAllowed) {
    throw new Error("Field missing");
  }
  if (!validator.isEmail(data.emailId)) {
    throw new Error("Invalid Email");
  }

  if (!validator.isStrongPassword(data.password)) {
    throw new Error("Weak Password");
  }
  if (!(data.firstName.length>=3&&data.firstName.length<=20)) {
    throw new Error("name should have atleast  3 char and atmost 20 char")
  }
  // Password validate karenge
  //
}

module.exports = ValidateUser;

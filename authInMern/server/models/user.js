const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    userName: Joi.string()
      .regex(/^[a-z0-9._-]{1,127}$/)
      .regex(/^[_\-\.0-9a-z]{1,127}$/)
      .required()
      .label("userName")
      .messages({
        "string.pattern.base":
          "User names can only consist of underscores, hyphens, dots, digits, and lowercase alphabetical characters (1-127 characters long).",
      }),
    password: Joi.string()
      .regex(/^[a-z0-9._-]{1,127}$/)
      .required()
      .label("password")
      .messages({
        "string.pattern.base":
          "Passwords can only consist of underscores, hyphens, dots, digits, and lowercase alphabetical characters (1-127 characters long).",
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("confirmPassword")
      .messages({
        "any.only": "Passwords must match.",
      }),
  });
  return schema.validate(data);
};
module.exports = { User, validate };

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error(`Email already in use`);
  }

  const salt = await bcrypt.genSalt(10); // adds salt(random strings) to password
  const hash = await bcrypt.hash(password, salt); // it hashes the password with salt(random strings)

  const user = await this.create({ email, password: hash });

  return user;
};

// Static Login Method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error(`Incorrect Email!`);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error(`Incorrect Password!`);
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);

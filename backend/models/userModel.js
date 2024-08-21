const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

// static signup method
userSchema.static.signup = async function (email, password) {
  const exist = await this.findOne({ email });

  if (exist) {
    throw Error(`User ${email} already in use`);
  }

  const salt = await bcrypt.genSalt(10); // adds salt(random strings) to password
  const hash = await bcrypt.hash(password, salt); // it hashes the password with salt(random strings)

  const user = await this.create({ email, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);

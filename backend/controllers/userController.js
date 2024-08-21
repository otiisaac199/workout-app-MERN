const User = require("../models/userModel");

// login user
const loginUser = async (req, res) => {
  res.json({ mssg: "Login User" });
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    res.status(200).json({ email, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
    return;
  }

  res.json({ mssg: "Signup User" });
};

module.exports = { signupUser, loginUser };

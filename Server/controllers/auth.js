const User = require("../Models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  if (user) {
    console.log(user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { name },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err, "error in updating user");
    res.status(500).json({ error: "Server error" });
  }
};

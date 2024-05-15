const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ userName: req.body.userName });
    if (user)
      return res
        .status(409)
        .send({ message: "This userName is already exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //chech if password same as confirmPassword
    if (req.body.password != req.body.confirmPassword)
      return res
        .status(409)
        .send({ message: "password does not match with confirmPassword!" });

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  console.log("Data received from frontend:", req.body);
});

module.exports = router;

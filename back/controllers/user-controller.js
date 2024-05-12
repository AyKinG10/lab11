const { User } = require("../models");
const { signToken } = require("../utils/auth");
const sendEmail = require('../emailService');

module.exports = {
  async getSingleUser(req, res) {
    const { user, params } = req;
    try {
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.cardio.id }, { username: params.username }],
      }).select("-__v");

      if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }

      res.json(foundUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async createUser(req, res) {
    const { body } = req;
    try {
      const existingUser = await User.findOne({ email: body.email });
      if (existingUser) {
        return res.status(400).json({ message: "Пользователь с таким email уже существует" });
      }

      const user = await User.create(body);

      if (!user) {
        return res.status(400).json({ message: "Что-то пошло не так!" });
      }

      await sendEmail(user.email, 'Регистрация прошла успешно', 'Добро пожаловать!');

      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async login(req, res) {
    const { body } = req;
    try {
      const user = await User.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }
      const correctPw = await user.isCorrectPassword(body.password);
      if (!correctPw) {
        return res.status(400).json({ message: "Wrong password!" });
      }
      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

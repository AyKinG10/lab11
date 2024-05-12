const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: "Username is Required",
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    minlength: 6,
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/],
  }
});


UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("Person", UserSchema);

module.exports = User;

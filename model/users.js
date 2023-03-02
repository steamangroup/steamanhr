import mongoose, { Schema, models, model } from "mongoose";
const bcrypt = require("bcrypt");
import { roles } from "@/utils/constants";

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [roles.admin, roles.staff],
    default: roles.staff,
  },
  leave: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Leaves",
    },
  ],
});

//called before saving a user
userSchema.pre("save", async function (next) {
  try {
    //if user is new, we harsh the password
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const harshPassword = await bcrypt.hash(this.password, salt);
      //overiding password with harsh password
      this.password = harshPassword;

      if (
        this.email === "admin@steamangroup.com" ||
        this.email === "py.bediako@steamangroup.com" ||
        this.email === "manager@steamangroup.com"
      ) {
        this.role = roles.admin;
      }
    }
  } catch (error) {
    next(error);
  }
});

//validating incoming password from the user
userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = models.Users || model("Users", userSchema);
export default User;

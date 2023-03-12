import signAcessToken from "@/lib/helper/jwt_helper";
import authSchema from "@/lib/helper/validation_schema";
import Employees from "@/model/employees";
import User from "@/model/users";

//import {authSchema} from '@/lib/helper/validation_schema'
export async function createUser(req, res) {
  try {
    const result = await authSchema.validateAsync(req.body);

    const doesExist = await User.findOne({ email: result.email });
    console.log(`This data is ${doesExist}`);
    if (doesExist) return res.status(404).json(`${result.email} already exist`);
    const user = new User(result);
    const savedUser = await user.save();
    console.log("User data here");

    const accessToken = await signAcessToken(savedUser.id);

    //console.log(`Access token is ${accessToken}`);
    return res.status(200).json({
      accessToken,
      _id: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
      firstname: savedUser.firstname,
      lastname: savedUser.lastname,
    });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    const { message } = error;
    res.status(404).json(error);
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authSchema.validateAsync(req.body);
    if (!result) return res.status(404).json("Error there");
    const user = await User.findOne({ email: result.email });
    if (!user) return res.status(404).json({ status: "User not registered" });

    //accessible
    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) return res.status(404).json("Password or email incorrect");

    //const username = user.email;

    //returning the token of the user
    const accessToken = await signAcessToken(user.id);
    res.status(200).json({
      accessToken: accessToken,
      id: user.id,
      email: user.email,
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
    });
    //res.redirect("/");

    //res.send(result);
  } catch (error) {
    res.status(404).json({ status: "Error logging in " });
  }
}

//get all users

export async function getUsers(req, res) {
  try {
    //accessing data of mongo db
    const users = await User.find({});
    if (!users) return res.status(404).send({ error: "Data not found" });

    //outputing users
    return res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Eror feteching data" });
  }
}
//get: http://localhost:3000/api/auth/id


export async function getUser(req, res) {
  try {
    //getting user id
    const { userId } = req.query;
    if (userId) {
      const user = await User.findById(userId);
      return res.status(200).json(user);
    }

    return res.status(404).json({ error: "User not selected" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the user" });
  }
}

export async function getEmployeeData(req, res) {
  try {
    const { email } = req.query;
    //find employee with work email matching the email provided
    const user = await Employees.findOne({ workEmail: email });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json("Could not get employee data");
      //console.log("Could not get employee data");
    }
  } catch (error) {
    console.log(error);
  }
}

//controllers
import Employees from "@/model/employees";
import Users from "@/model/employees";
import Leaves from "@/model/leaves";
import mongoose from "mongoose";

const empId = mongoose.SchemaTypes.ObjectId;
//post: http://localhost:3000/api/users
export async function addEmployee(req, res) {
  try {
    //storing data in the variable formData
    const formData = req.body;
    //if no form data
    if (!formData)
      return res.status(404).json({ error: "Form data Not Provided" });
    //creating a new user. The function will exceed when data is submited successfully in the db
    Users.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).send({ error: "Error posting data" });
  }
}

//get: http://localhost:3000/api/users
export async function getEmployees(req, res) {
  try {
    //accessing data of mongo db
    const users = await Employees.find({});
    if (!users) return res.status(404).send({ error: "Data not found" });

    //outputing users
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send({ error: "Eror feteching data" });
  }
}

//get: http://localhost:3000/api/users/id
export async function getEmployee(req, res) {
  try {
    //getting user id
    const { employeeId } = req.query;

    if (employeeId) {
      const user = await Employees.findById(employeeId);
      //const user_leave=await Leaves.findOne({})
      res.status(200).json(user);
    }

    res.status(404).json({ error: "User not selected" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the user" });
  }
}

//update: http://localhost:3000/api/users/id
export async function updateEmployee(req, res) {
  try {
    //retrieving user id
    const { employeeId } = req.query;
    const formData = req.body;

    //checking if user id and form data is available and update it
    if (employeeId && formData) {
      const user = await Employees.findByIdAndUpdate(employeeId, formData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "Error not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error while updating the data....." });
  }
}

export async function deleteEmployee(req, res) {
  try {
    //getting user id
    const { employeeId } = req.query;

    if (employeeId) {
      const user = await Employees.findByIdAndDelete(employeeId);
      return res.status(200).json(user);
    }
    return res.status(404).json({ error: "User not selected....." });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting the user" });
  }
}

export async function getEmployeeLeave(req, res) {
  try {
    const { leaveId } = req.query;
    console.log(leaveId);

    if (leaveId) {
      const user_leave = await Leaves.findById({ leaveId });
      return res.status(200).json(user_leave);
    }
    return res.status(404).json({ error: "leave id not selected....." });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting the user" });
  }
}

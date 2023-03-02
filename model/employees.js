//specifying structure of the schema
import { required } from "joi";
import mongoose, { Schema, models, model, Mongoose } from "mongoose";
import Leaves from "./leaves";

//new instance of the schema class
const EmployeeSchema = new Schema({
  //id: Number,
  title: {
    type: String,
  },

  jobTitle: String,
  fullName: String,
  businessUnit: String,
  employmentType: String,
  workEmail: {
    type: String,
    unique: true,
    require: true,
  },
  profilePicture: String,
  //teams: [],
  department: String,
  officeLocation: String,
  employmentStatus: String,
  employmentStartDate: String,
  dateOfBirth: String,
  gender: String,
  maritalStatus: String,
  contactNumber: String,
  placeOfResidence: String,
  educationalLevel: String,
  snnit: String,
  nationaldNumber: String,
  tin: String,
  nextOfKinName: String,
  nextOfKinNumber: String,
  emergencyContactName: String,
  emergencyContactNumber: String,
  employeeBankName: String,
  accountHolder: String,
  accountNumber: String,
  healthCondition: String,
  onMedication: {
    type: String,
    default: "no",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },

  //  extraInformation: String,
});

const Employees = models.Employees || model("Employees", EmployeeSchema);
export default Employees;

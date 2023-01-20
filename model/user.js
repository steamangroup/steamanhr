//specifying structure of the schema
import { Schema, models, model } from "mongoose";

//new instance of the schema class
const userSchema = new Schema({
  jobTitle: String,
  fullName: String,
  businessUnit: String,
  employmentType: String,
  workEmail: String,
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
  onMedication: String,
  extraInformation: String,
});

const Users = models.user || model("user", userSchema);
export default Users;

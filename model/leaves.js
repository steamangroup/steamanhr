//specifying structure of the schema
import mongoose, { Schema, models, model, Mongoose } from "mongoose";

//new instance of the schema class
const LeaveSchema = new Schema({
  leaveType: {
    type: String,
    required: true,
    default: "annual",
  },

  startDate: {
    type: String,
    required: true,
  },

  endDate: {
    type: String,
    required: true,
  },
  leaveReason: {
    type: String,
    required: true,
  },
  handingOverNotes: {
    type: String,
    required: true,
  },
  leaveStatus: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  employees: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Employees",
  },

  //  extraInformation: String,
});

const Leaves = models.Leaves || model("Leaves", LeaveSchema);
export default Leaves;

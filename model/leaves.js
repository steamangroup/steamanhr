//specifying structure of the schema
import { Schema, models, model } from "mongoose";

//new instance of the schema class
const LeaveSchema = new Schema({
  leaveType: {
    type: String,
    required: true,
  },

  startDate: {
    type: String,
    required: true,
  },

  endtDate: {
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  //  extraInformation: String,
});

const Leaves = models.leaves || model("leaves", LeaveSchema);
export default Leaves;

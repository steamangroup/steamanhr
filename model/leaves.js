//specifying structure of the schema
import mongoose, { Schema, models, model, Mongoose } from "mongoose";

//new instance of the schema class
const LeaveSchema = new Schema({
  leaveType: {
    type: String,
    required: true,
    default: "other",
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

  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  leaveDuration: {
    type: Number,
    default: 0,
  },
  totalLeaveDays: {
    type: Number,
    default: 20,
  },

  lineManagerName: {
    type: Number,
    default: null,
  },
  leaveDenialDate: {
    type: Date,
    default: null,
  },
  leaveApprovalDate: {
    type: Date,
    default: null,
  },
  leaveApprovalReason: {
    type: String,
    default: null,
  },
  leaveApprovalReason: {
    type: String,
    default: null,
  },
});

const Leaves = models.Leaves || model("Leaves", LeaveSchema);
export default Leaves;

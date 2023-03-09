//controllers
import Leaves from "@/model/leaves";
import mongoose from "mongoose";
//const empId = mongoose.Types.ObjectId;

//post: http://localhost:3000/api/users
export async function addLeave(req, res) {
  try {
    //storing data in the variable formData
    const formData = req.body;
    //if no form data
    if (!formData)
      return res.status(404).json({ error: "Form data Not Provided" });
    //creating a new user. The function will exceed when data is submited successfully in the db
    Leaves.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error: "Error posting data" });
  }
}

//get: http://localhost:3000/api/users
export async function getLeaves(req, res) {
  try {
    //accessing data of mongo db
    const leaves = await Leaves.find({}).populate("user");

    if (!leaves) return res.status(404).send({ error: "Data not found" });

    //outputing users
    return res.status(200).json(leaves);
  } catch (error) {
    res.status(404).json({ error: "Error feteching data" });
  }
}

//get: http://localhost:3000/api/users/id
export async function getLeave(req, res) {
  try {
    //getting user id
    const { id } = req.query;

    if (id) {
      const leave = await Leaves.findById(id).populate("user");
      return res.status(200).json(leave);
    }

    return res.status(404).json({ error: "Leave not selected" });
  } catch (error) {
    return res.status(404).json({ error: "Error while retrieving the leave" });
  }
}

//update: http://localhost:3000/api/users/id
export async function updateLeave(req, res) {
  try {
    //retrieving user id
    const { id } = req.query;
    const formData = req.body;

    //checking if user id and form data is available and update it
    if (id && formData) {
      const leave = await Leaves.findByIdAndUpdate(id, formData);
      return res.status(200).json(leave);
    }
    return res.status(404).json({ error: "Error not selected" });
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Error while updating the data....." });
  }
}

export async function deleteLeave(req, res) {
  try {
    //getting user id
    const { id } = req.query;

    if (id) {
      const leave = await Leaves.findByIdAndDelete(id);
      return res.status(200).json(leave);
    }
    return res.status(404).json({ error: "Leave not selected....." });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting the leave" });
  }
}

export async function getEmployeeLeaves(req, res) {
  try {
    const { id } = req.query;
    //find employee with id matching the email provided
    const user_leave = await Leaves.find({ user: id }).populate({
      path: "user",
      select: "firstname",
    });
    if (user_leave) {
      return res.status(200).json(user_leave);
    } else {
      return res.status(404).json("Could not get employee leave data");
      //console.log("Could not get employee data");
    }
  } catch (error) {
    return res.status(404).json({ error: "Error retrieving employee leave" });
  }
}

//leave status section
export async function getPendingLeaves(req, res) {
  try {
    const { id } = req.query;
    //find employee with id matching the email provided
    const pending_leaves = await Leaves.find({
      user: id,
      leaveStatus: "pending",
    }).count();

    if (pending_leaves) {
      return res.status(200).json(pending_leaves);
    } else {
      return res.status(404).json("Could not get employee leave status data");
      //console.log("Could not get employee data");
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Error retrieving employee leave status" });
  }
}

export async function getApprovedLeaves(req, res) {
  try {
    const { id } = req.query;

    const approved_leaves = await Leaves.find({
      user: id,
      leaveStatus: "approved",
    }).count();

    if (approved_leaves) {
      return res.status(200).json(approved_leaves);
    } else {
      return res.status(404).json("Could not get employee leave status data");
      //console.log("Could not get employee data");
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Error retrieving employee leave status" });
  }
}

export async function getRejectedLeaves(req, res) {
  try {
    const { id } = req.query;
    //find employee with id matching the email provided
    const rejected_leaves = await Leaves.find({
      user: id,
      leaveStatus: "rejected",
    }).count();

    if (rejected_leaves) {
      return res.status(200).json(rejected_leaves);
    } else {
      return res.status(404).json("Could not get employee leave status data");
      //console.log("Could not get employee data");
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Error retrieving employee leave status" });
  }
}

export async function getLeaveDuration(req, res) {
  try {
    const { id } = req.query;
    //find employee with id matching the email provided

    const leave_duration = await Leaves.aggregate([
      //{ $match: { user: id } },
      {
        $group: {
          _id: "$user",
          total: { $sum: "$leaveDuration" },
        },
      },
      {
        $addFields: {
          remainingDays: {
            $subtract: [20, "$total"],
          },
        },
      },
    ]);

    if (leave_duration) {
      return res.status(200).json(leave_duration);
    } else {
      return res.status(404).json("Could not get employee leave duration");
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Error retrieving employee leave duration" });
  }
}

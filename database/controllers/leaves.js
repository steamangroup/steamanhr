//controllers
import Leaves from "@/model/leaves";
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
    return res.status(404).send({ error: "Error posting data" });
  }
}

//get: http://localhost:3000/api/users
export async function getLeaves(req, res) {
  try {
    //accessing data of mongo db
    const leaves = await Leaves.find({});
    if (!leaves) return res.status(404).send({ error: "Data not found" });

    //outputing users
    res.status(200).json(leaves);
  } catch (error) {
    res.status(404).send({ error: "Error feteching data" });
  }
}

//get: http://localhost:3000/api/users/id
export async function getLeave(req, res) {
  try {
    //getting user id
    const { id } = req.query;

    if (id) {
      const leave = await Leaves.findById(id);
      res.status(200).json(leave);
    }

    res.status(404).json({ error: "Leave not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error while retrieving the leave" });
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
      res.status(200).json(leave);
    }
    res.status(404).json({ error: "Error not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error while updating the data....." });
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

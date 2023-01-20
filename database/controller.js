//controllers
import Users from "@/model/user";

//post: http://localhost:3000/api/users
export async function postUser(req, res) {
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
export async function getUsers(req, res) {
  try {
    //accessing data of mongo db
    const users = await Users.find({});
    if (!users) return res.status(404).send({ error: "Data not found" });

    //outputing users
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send({ error: "Eror feteching data" });
  }
}

//delete: http://localhost:3000/api/users/id
export async function putUser(req, res) {
  try {
    //retrieving user id
    const { userId } = req.query;
    const formData = req.body;

    //checking if user id and form data is available and update it
    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "Error not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error while updating the data....." });
  }
}

export async function deleteUser(req, res) {
  try {
    //getting user id
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      return res.status(200).json({ deleted: userId });
    }
    return res.status(404).json({ error: "User not selected....." });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting the user" });
  }
}

//fetching our API data

const BASE_URL = "http://localhost:3000";

const NETLIFY_URL = "https://steamanhr.netlify.app";

//getting all users
export const getLeaves = async () => {
  const response = await fetch(`${NETLIFY_URL}/api/leaves`);
  const json = response.json();
  return json;
};

//getting a single user
export const getLeave = async (id) => {
  const response = await fetch(`${NETLIFY_URL}/api/leaves/${id}`);
  const json = response.json();

  //checking data is available
  if (json) return json;
  return {};
};

//posting a new user
//formData is data passed to thi function
export async function addLeave(formData) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //stringify the data and return it to the body
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${NETLIFY_URL}/api/leaves`, Options);
    const json = response.json;
    return json;
  } catch (error) {
    return error;
  }
}

//updating a user
export async function updateLeave(id, formData) {
  try {
    const Options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      //stringify the data and return it to the body
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${NETLIFY_URL}/api/leaves/${id}`, Options);
    const json = response.json;
    return json;
  } catch (error) {
    return console.log(`Error is ${error}`);
  }
}

//deleting a user

export async function deleteLeave(id) {
  try {
    const Options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      //stringify the data and return it to the body
      //body: JSON.stringify(formData),
    };
    const response = await fetch(`${NETLIFY_URL}/api/leaves/${id}`, Options);
    const json = response.json;
    return json;
  } catch (error) {
    return error;
  }
}

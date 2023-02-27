//fetching our API data

const BASE_URL = "http://localhost:3000";
const VERCEL_URL = "https://steamanhr-self.vercel.app";

//getting all users
export const getEmployees = async () => {
  const response = await fetch(`${VERCEL_URL}/api/employees`);
  const json = response.json();
  return json;
};

//getting a single user
export const getEmployee = async (employeeId) => {
  const response = await fetch(`${VERCEL_URL}/api/employees/${employeeId}`);
  const json = response.json();

  //checking data is available
  if (json) return json;
  return {};
};

//posting a new user
//formData is data passed to thi function
export async function addEmployee(formData) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //stringify the data and return it to the body
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${VERCEL_URL}/api/employees`, Options);
    const json = response.json;
    return json;
  } catch (error) {
    return error;
  }
}

//updating a user
export async function updateEmployee(employeeId, formData) {
  try {
    const Options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      //stringify the data and return it to the body
      body: JSON.stringify(formData),
    };
    const response = await fetch(
      `${VERCEL_URL}/api/employees/${employeeId}`,
      Options
    );
    const json = response.json;
    return json;
  } catch (error) {
    return console.log(`Error is ${error}`);
  }
}

//deleting a user

export async function deleteEmployee(employeeId) {
  try {
    const Options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      //stringify the data and return it to the body
      //body: JSON.stringify(formData),
    };
    const response = await fetch(
      `${VERCEL_URL}/api/employees/${employeeId}`,
      Options
    );
    const json = response.json;
    return json;
  } catch (error) {
    return error;
  }
}

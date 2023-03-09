//fetching our API data

import { redirect } from "next/dist/server/api-utils";

const BASE_URL = "http://localhost:3000";
const NETLIFY_URL = "https://steamanhr.netlify.app/";

export const authHome = async () => {
  try {
    const Options = {
      method: "GET",
      headers: { Authorization: "" },
    };
    const response = await fetch(`${BASE_URL}`);
    const json = response.json();
    return json;
  } catch (error) {
    return error;
  }
};

//registering user

/*******
export async function createUser(result) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //stringify the data and return it to the body
      body: JSON.stringify(result),
    };
    const response = await fetch(`${BASE_URL}/api/auth/register`, Options);
    const json = response.json;
    return json;
  } catch (error) {
    return error;
  }
}
*** */

//getting all users
export const getUsers = async () => {
  const response = await fetch(`${NETLIFY_URL}/api/auth`);
  const json = response.json();
  return json;
};

export const getUser = async (userId) => {
  const response = await fetch(`${NETLIFY_URL}/api/auth/${userId}`);
  const json = response.json();

  //checking data is available
  if (json) return json;
  return {};
};

//getting employee data using his user id

export const getEmployeeData = async (email) => {
  const response = await fetch(`${NETLIFY_URL}/api/auth/empData/${email}`);
  const json = response.json();

  //checking data is available
  if (json) return json;
  return {};
};

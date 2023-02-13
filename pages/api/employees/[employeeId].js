import connectMongo from "@/database/connect";

import {
  deleteEmployee,
  getEmployee,
  updateEmployee,
} from "../../../database/controllers/employees";

export default async function handler(req, res) {
  //catching error in the database
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection " })
  );

  //http request types
  const { method } = req;
  switch (method) {
    case "GET":
      getEmployee(req, res);
      break;
    case "PUT":
      updateEmployee(req, res);
      break;
    case "DELETE":
      deleteEmployee(req, res);
      break;

    default:
      res.setHeader("ALLOW", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method${method} Not Allowed`);
  }
}

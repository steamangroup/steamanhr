import connectMongo from "@/database/connect";
import { addLeave, getLeaves } from "@/database/controllers/leaves";

export default async function handler(req, res) {
  //catching error in the database
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection " })
  );

  //http request types
  const { method } = req;
  switch (method) {
    case "GET":
      getLeaves(req, res);
      break;
    case "POST":
      addLeave(req, res);
      break;
    /****case "PUT":
      updateUser(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      break;
      **/
    default:
      res.setHeader("ALLOW", ["GET", "POST"]);
      res.status(405).end(`Method${method} Not Allowed`);
  }
}

import connectMongo from "@/database/connect";
import {
  deleteLeave,
  getLeave,
  updateLeave,
} from "@/database/controllers/leaves";

export default async function handler(req, res) {
  //catching error in the database
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection " })
  );

  //http request types
  const { method } = req;
  switch (method) {
    case "GET":
      getLeave(req, res);
      break;
    case "PUT":
      updateLeave(req, res);
      break;
    case "DELETE":
      deleteLeave(req, res);
      break;

    default:
      res.setHeader("ALLOW", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method${method} Not Allowed`);
  }
}

import Jwt from "jsonwebtoken";

const signAcessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "30d",
      issuer: "steamanhr.com",
      audience: userId,
    };
    Jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    if (err) {
      res.status(401).send({ message: "Token is not valid" });
    } else {
      req.user;
    }
  }
};

export default signAcessToken;

import jwt from "jsonwebtoken";
import mongoose from "mongoose"
interface Payload {
  userId:mongoose.Types.ObjectId;
  role: string;
}
export const createJWT = (payload: Payload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyJWT = (token: string): Payload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

export const sanitizeUser = (user: any):object => {
  const _user = user.toJSON();
  delete _user.password;
  return _user;
};

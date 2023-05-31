import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

interface SingUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const singUp: RequestHandler<
  unknown,
  unknown,
  SingUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUser = await UserModel.findOne({ username: username }).exec();

    if (existingUser) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a different one or log in instead."
      );
    }

    const existingEmail = await UserModel.findOne({ email: email }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email address already exist. Please log in instead."
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

import Session from "../db/models/Session.js";
import User from "../db/models/User.js";
import { hashValue } from "../utils/hash.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"

import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';
import { SMTP, TEMPLATES_DIR } from "../constants/index.js";

import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import createHttpError from "http-errors";

export const findUser = filter => User.findOne(filter);

export const register = async (data) => {
    const {password} = data;
    const hashPassword = await hashValue(password)
   return User.create({...data, password: hashPassword});
}

export const deleteSession = filter => Session.deleteOne(filter);

export const requestResetToken = async (email) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }
 
  const resetToken = jwt.sign(
      {
        sub: user._id,
        email,
      },
      env('JWT_SECRET'),
      {
        expiresIn: '5m',
      },
    );

    const resetPasswordTemplatePath = path.join(TEMPLATES_DIR, "request-reset-email.html",)

    const templateSource = (
      await fs.readFile(resetPasswordTemplatePath)
    ).toString();

    const template = handlebars.compile(templateSource);

    const html = template({
      name: user.name,
      link: `${env("APP_DOMAIN")}/reset-pwd?token=${resetToken}`
    });

    try {
      await sendEmail({
        from: env(SMTP.SMTP_FROM),
        to: email,
        subject: 'Reset your password',
        html,
      });
    } catch (err) {
      throw createHttpError(
        500,
        'Failed to send the email, please try again later.',
        err,
      );
    }
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await User.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );

  await Session.deleteOne({ userId: user._id });
};
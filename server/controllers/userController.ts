import { RequestHandler } from "express";
import { PrismaClient, User } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface GoogleUserInfo {
  id: string;
  email: string;
}

const prisma = new PrismaClient();
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

class UserController {
  getUserId: RequestHandler = async (req, res) => {
    // error handling done by auth middleware
    res.json({ userId: req.userId });
  };

  registerUser: RequestHandler = async (req, res) => {
    const { name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "30d" });

      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  };

  loginUser: RequestHandler = async (req, res) => {
    const { name, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          name,
        },
      });

      if (!user || !(await bcrypt.compare(password, user.password!))) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  };

  googleAuth: RequestHandler = (req, res) => {
    const url = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/userinfo.email"],
    });
    res.redirect(url);
  };

  googleAuthCallback: RequestHandler = async (req, res) => {
    const { tokens } = await oAuth2Client.getToken(req.query.code as string);
    oAuth2Client.setCredentials(tokens);
    const { data } = await oAuth2Client.request({ url: "https://www.googleapis.com/oauth2/v2/userinfo" });
    const userInfo = data as GoogleUserInfo;

    let user: User | null;

    user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: userInfo.email as string,
          googleId: userInfo.id as string,
        },
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
    res.redirect(`${process.env.CLIENT_URL}/google/success?token=${encodeURIComponent(token)}&userId=${user.id}`);
  };
}

export default UserController;

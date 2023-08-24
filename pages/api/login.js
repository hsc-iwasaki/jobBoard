import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import db from "../lib/db";
import { signIn } from "next-auth/react";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      // ハッシュ化されたパスワードと入力されたパスワードを比較
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      return res.status(200).json({ message: "Logged in successfully." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  res.status(405).end(); // Method Not Allowed
}

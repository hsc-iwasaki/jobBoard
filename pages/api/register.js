import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        throw new Error("このメールアドレスは既に使用されています");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });

      return res.status(200).json({ message: "登録が完了しました" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  res.status(405).end(); // Method Not Allowed
}

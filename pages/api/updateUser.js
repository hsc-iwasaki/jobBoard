import { prisma } from "@/lib/prisma";
import { getSession, signIn } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await getSession({ req });

      const {
        name,
        ruby,
        image,
        birthday,
        gender,
        address,
        tel,
        graduation,
        spouse,
      } = req.body;

      const updateUser = await prisma.user.update({
        where: {
          email: req.query.email,
        },
        data: {
          name: name,
          ruby: ruby,
          image: image,
          birthday: birthday,
          gender: gender,
          address: address,
          tel: tel,
          graduation: graduation,
          spouse: Boolean(spouse),
        },
      });

      // セッションをサーバーサイドで更新する
      if (session) {
        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            name: updateUser.name,
            ruby: updateUser.ruby,
            image: updateUser.image,
            birthday: updateUser.birthday,
            gender: updateUser.gender,
            address: updateUser.address,
            tel: updateUser.tel,
            graduation: updateUser.graduation,
            spouse: updateUser.spouse,
          },
        };

        // クライアントに更新されたセッション情報を送信する
        await signIn("credentials", {
          callbackUrl: `${req.headers.origin}/user`,
          redirect: false,
          session: updatedSession,
        });
      }

      return res
        .status(200)
        .json({ message: "ユーザー情報を更新しました", user: updateUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  res.status(405).end(); // Method Not Allowed
}

import { sendMail } from "@/lib/mailer";

import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const data = JSON.parse(req.body);
    const job = data.job;
    const user = data.user;
    if (user.gender === "male") {
      user.gender = "男性";
    } else if (user.gender === "female") {
      user.gender = "女性";
    }
    if (user.spouse) {
      user.spouse = "あり";
    } else if (!user.spouse) {
      user.spouse = "なし";
    }
    const company = await prisma.company.findUnique({
      where: {
        id: job.companyId,
      },
      include: {
        recruiter: true, // Include the related Company records
      },
    });

    const { method } = req;
    switch (method) {
      case "POST": {
        await sendMail(
          `${job.title}に応募がありました`,
          company.recruiter.email,
          `
          ${job.title}に応募がありました
          
          ■応募者情報
          --------------------------
          ■氏名
          ${user.name}
          
          ■フリガナ
          ${user.ruby}
          
          ■Email
          ${user.email}

          ■生年月日
          ${user.birthday}

          ■性別
          ${user.gender}

          ■配偶者
          ${user.spouse}
          `
        );
        res.status(200).send("Success");
        break;
      }
      case "GET": {
        //Do some thing
        res.status(200).send(req.auth_data);
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(400).json({
      error_code: "api_one",
      message: err.message,
    });
  }
}

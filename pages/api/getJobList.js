import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const page = Number(req.query.page) || 1; // クエリからページ番号を取得
    const limit = 20; // 1ページあたりのレコード数
    const skip = (page - 1) * limit; // スキップするレコード数

    const jobs = await prisma.job.findMany({
      skip: skip, // ページネーションのためのスキップ
      take: limit, // 1ページあたりのレコード数
      include: {
        company: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

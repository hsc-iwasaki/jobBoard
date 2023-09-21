import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true, // Include the related Company records
      },
      orderBy: {
        id: "desc",
      },
    });

    // ルートディレクトリのパスを取得
    const rootDirectory = process.cwd();

    // job.jsonファイルのフルパスを取得
    const filePath = path.join(rootDirectory, "json", "job.json");

    try {
      // job.jsonファイルの最終変更日時を取得
      const stat = await fs.stat(filePath);
      const now = new Date();
      const lastModified = new Date(stat.mtime);

      // 最終変更日時から24時間以上経過しているか確認
      if (now.getTime() - lastModified.getTime() > 24 * 60 * 60 * 1000) {
        // 24時間以上経過している場合、ファイルを上書き
        await fs.writeFile(filePath, JSON.stringify(jobs, null, 2), "utf-8");
      }
    } catch (error) {
      // job.jsonが存在しない場合、新規にファイルを作成
      if (error.code === "ENOENT") {
        await fs.writeFile(filePath, JSON.stringify(jobs, null, 2), "utf-8");
      } else {
        throw error;
      }
    }

    return res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

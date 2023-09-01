import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        companyId,
        name,
        contactEmail,
        title,
        description,
        location,
        salary,
        type,
      } = req.body;

      const newJob = await prisma.job.create({
        data: {
          companyId: Number(companyId),
          title: title,
          description: description,
          location: location,
          salary: salary,
          type: type,
        },
      });
      return res.status(200).json({ message: "求人情報を公開しました" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  res.status(405).end(); // Method Not Allowed
}

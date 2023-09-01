import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const { id } = req.body;
    const job = await prisma.job.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

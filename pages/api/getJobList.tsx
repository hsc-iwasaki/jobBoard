import { prisma } from "../lib/prisma";
export default async function handler(req: any, res: any) {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true, // Include the related Company records
      },
    });

    return res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

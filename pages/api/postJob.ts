import { prisma } from "../lib/prisma";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const { name, contactEmail, title, description, location, salary, type } =
        req.body;

      const newJob = await prisma.company.create({
        data: {
          name: name,
          contactEmail: contactEmail,
          jobs: {
            create: [
              {
                title: title,
                description: description,
                location: location,
                salary: salary,
                type: type,
              },
            ],
          },
        },
      });
      return res.status(200).json({ message: "求人情報を公開しました" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  res.status(405).end(); // Method Not Allowed
}

import db from "../lib/db";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const company_id = 1;
      const { place, feature, name } = req.body;
      const query = `
        INSERT INTO works (company_id, work_place, work_feature, company_name)
        VALUES (?, ?, ?, ?);
      `;
      const results = await db.query(query, [company_id, place, feature, name]);
      await db.end();

      res.status(200).json({ success: true, insertedId: results.insertId }); // 新しく生成されたidを返す
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

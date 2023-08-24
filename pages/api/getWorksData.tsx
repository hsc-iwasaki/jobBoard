import db from "../lib/db";
export default async function handler(req: any, res: any) {
  try {
    const result = await db.query(`SELECT * FROM works`);
    console.log(result);
    await db.end();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

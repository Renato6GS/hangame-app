import clientPromise from "lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("link_search_db");
    const data = { ...req.body };
    const collection = await db.collection("hangame_comments").insertOne(data);

    res.status(200).json({ status: true, message: collection });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error });
  }
}

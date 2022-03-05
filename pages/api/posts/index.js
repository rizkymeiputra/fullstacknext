import db from "./../../../libs/db";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  await authorization(req, res);

  const posts = await db("posts");

  res.status(200);
  res.json({
    message: "Post data",
    count: posts.length,
    data: posts,
  });
}

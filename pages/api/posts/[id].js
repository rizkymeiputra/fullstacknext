import db from "./../../../libs/db";
import authorization from "./../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  await authorization(req, res);

  const { id } = req.query;

  const post = await db("posts").where({ id }).first();

  res.status(200);
  res.json({
    message: "Get post data successfully!",
    data: post,
  });
}

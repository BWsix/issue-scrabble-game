// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  console.log(req.body);
  res.status(200).json({ name: "bob" });
};

export default handler;

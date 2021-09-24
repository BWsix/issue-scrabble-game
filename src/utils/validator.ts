import { createHmac, timingSafeEqual } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

export const verifyGithubPayload = (func: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const ghSig = req.headers["x-hub-signature-256"] as string;
    const mySig =
      "sha256=" +
      createHmac("sha256", process.env.WEBHOOK_SECRET!)
        .update(JSON.stringify(req.body))
        .digest("hex");

    if (timingSafeEqual(Buffer.from(ghSig), Buffer.from(mySig))) {
      return await func(req, res);
    } else {
      return res.status(403).json("Hey, who are you?");
    }
  };
};

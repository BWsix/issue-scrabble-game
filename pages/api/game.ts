import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiBase } from "src/constants";
import { results } from "src/utils/results";
import { verifyGithubPayload } from "src/utils/validator";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405);

  const { action, issue } = req.body as WebhookBody;
  if (action !== "opened") return res.status(400);

  const { number, title } = issue;

  const { data: allIssues } = await axios.get(apiBase);
  const { title: prevTitle } = allIssues[1] as WebhookIssue;

  if (title[0] === prevTitle[prevTitle.length - 1]) {
    await results.ok(number);
    res.status(200).json({ stats: "ok", detail: { title, prevTitle } });
  } else {
    await results.notOk(number, prevTitle);
    res.status(200).json({ stats: "not ok", detail: { title, prevTitle } });
  }
};

export default verifyGithubPayload(handler);

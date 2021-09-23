import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiBase } from "src/constants";
import { results } from "src/utils/results";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405);

  const { action, issue } = req.body as WebhookBody;
  if (action !== "opened") return res.status(400);

  const { number, title } = issue;

  const { data: allIssues } = await axios.get(apiBase);
  const { title: prevTitle } = allIssues[1] as WebhookIssue;

  if (title[0] === prevTitle[prevTitle.length - 1]) {
    results.ok(number);
  } else {
    results.notOk(number);
  }
}

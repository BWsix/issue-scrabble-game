import axios from "axios";
import { apiAddLabel, apiIssue, apiIssueComment } from "src/constants";

const addLabel = {
  accepted: async (number: number) => {
    await axios.post(
      apiAddLabel(number),
      { labels: ["accepted"] },
      { headers: { Authorization: process.env.GITHUB_API_TOKEN } }
    );
  },
};

export const results = {
  ok: async (number: number) => {
    await axios.post(
      apiIssueComment(number),
      { body: "ok!" },
      { headers: { Authorization: process.env.GITHUB_API_TOKEN } }
    );

    await addLabel.accepted(number);
  },

  notOk: async (number: number, prevTitle: string) => {
    await axios.patch(
      apiIssue(number),
      { state: "closed", labels: ["invalid"] },
      { headers: { Authorization: process.env.GITHUB_API_TOKEN } }
    );

    await axios.post(
      apiIssueComment(number),
      { body: "not ok. 上一個詞是 : " + prevTitle },
      { headers: { Authorization: process.env.GITHUB_API_TOKEN } }
    );
  },
};

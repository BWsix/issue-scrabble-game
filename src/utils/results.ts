import axios from "axios";
import { apiAddLabel, apiIssue, apiIssueComment } from "src/constants";

const addLabel = {
  accepted: (number: number) => {
    axios.post(
      apiAddLabel(number),
      { labels: ["accepted"] },
      { headers: { Authorization: process.env.GITHUB_API_TOKEN } }
    );
  },
};

export const results = {
  ok: (number: number) => {
    axios.post(
      apiIssueComment(number),
      { body: "ok!" },
      { headers: { Authorization: process.env.GITHUB_API_TOKEN } }
    );

    addLabel.accepted(number);
  },

  notOk: (number: number) => {
    axios.patch(
      apiIssue(number),
      { state: "closed", labels: ["invalid"] },
      { headers: { Authorization: process.env.GITHUB_API_TOKEN } }
    );
  },
};

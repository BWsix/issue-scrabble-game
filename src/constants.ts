const owner = process.env.OWNER;
const repo = process.env.REPO;

const base = `https://api.github.com/repos/${owner}/${repo}/issues`;

export const apiBase = base;
export const apiIssue = (issue_number: number) => base + `/${issue_number}`;
export const apiIssueComment = (issue_number: number) =>
  base + `/${issue_number}/comments`;
export const apiAddLabel = (issue_number: number) =>
  base + `/${issue_number}/labels`;

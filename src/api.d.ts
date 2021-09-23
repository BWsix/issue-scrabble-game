type WebhookBody = {
  action: string;
  issue: WebhookIssue;
};

type WebhookIssue = {
  number: number;
  title: string;
};

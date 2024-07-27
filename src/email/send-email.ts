import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: "us-east-1" });
import throttledQueue from "throttled-queue";
import { env } from "../env";

const throttle = throttledQueue(1, 5000, true);
let pendingCount = 0;

export function addPending(amount: number) {
  pendingCount += amount;
}

export function sendEmail({
  email,
  htmlBody,
  subject,
  textBody,
  unsubscribeId,
}: {
  email: string;
  htmlBody: string;
  subject: string;
  textBody: string;
  unsubscribeId: string;
}) {
  const unsubscribeLinkHtml = `<div style="text-align: center;">Seibert Software Solutions, LLC<br/>PO Box 913<br/>Harrison TN, 37341<br /><br /> <a href="${env.HOST_NAME}/unsubscribe/${unsubscribeId}" target="_blank;">Unsubscribe</a></div>`;
  const unsubscribeTextHtml = `Seibert Software Solutions, LLC @ PO Box 913, Harrison TN, 37341, You can unsubscribe here: ${env.HOST_NAME}/unsubscribe/${unsubscribeId}`;

  return throttle(() => {
    console.info(`sending email to ${email} - ${pendingCount--} remaining`);

    return sesClient.send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: htmlBody + unsubscribeLinkHtml,
            },
            Text: {
              Charset: "UTF-8",
              Data: textBody + unsubscribeTextHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: subject,
          },
        },
        ReturnPath: env.MAIL_FROM,
        Source: `${env.MAIL_NAME} <${env.MAIL_FROM}>`,
      }),
    );
  });
}

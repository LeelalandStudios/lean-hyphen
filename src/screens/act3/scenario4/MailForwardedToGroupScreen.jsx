import { FAKE_DOMAIN } from "../../../content/scenario4.js";
import GroupChatThread from "../../../components/whatsapp/GroupChatThread.jsx";
import WhatsAppShell from "../../../components/whatsapp/WhatsAppShell.jsx";
import { FRIENDS_GROUP } from "../../../content/act1Scene2.js";

/** Path forward — you shared the scam email to the group (link still inside). */
export default function MailForwardedToGroupScreen() {
  const messages = [
    {
      type: "text",
      sender: "You",
      text: "Guys is this real?? School fees email just came",
      time: "7:02 PM",
      mine: true,
    },
    {
      type: "forwarded",
      sender: "You",
      body: `URGENT — Fee payment failed\nPay now: https://${FAKE_DOMAIN}/pay-fees`,
      time: "7:02 PM",
    },
    {
      type: "text",
      sender: "Aryan",
      text: "wait let me open it",
      time: "7:03 PM",
    },
  ];

  return (
    <WhatsAppShell title={FRIENDS_GROUP.title} subtitle="You forwarded the email">
      <GroupChatThread messages={messages} />
      <p className="mx-3 mb-4 rounded-xl bg-red-50 px-3 py-2 text-center text-xs text-red-800">
        Forwarding the email spread the live link — not just a warning.
      </p>
    </WhatsAppShell>
  );
}

import { PATH_SEND_YOU_REPLY, RAFI_SCAM_NUMBER, RAFI_THREAD } from "../../../content/scenario3.js";
import GroupChatThread from "../../../components/whatsapp/GroupChatThread.jsx";
import WhatsAppShell from "../../../components/whatsapp/WhatsAppShell.jsx";

export default function WhatsAppRafiOtpSentScreen() {
  const messages = [
    ...RAFI_THREAD.map((m) => ({
      type: "text",
      sender: m.sender,
      text: m.text,
      time: m.time,
    })),
    { type: "text", ...PATH_SEND_YOU_REPLY },
    {
      type: "text",
      sender: RAFI_SCAM_NUMBER,
      text: "thanks bro login worked 🔥",
      time: "6:09 PM",
    },
  ];

  return (
    <WhatsAppShell title={RAFI_SCAM_NUMBER} subtitle="not in your contacts">
      <GroupChatThread messages={messages} />
    </WhatsAppShell>
  );
}

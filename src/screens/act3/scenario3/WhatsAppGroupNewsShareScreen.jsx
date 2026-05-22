import { NEWS_SHARE_BY_PATH } from "../../../content/scenario3.js";
import WhatsAppGroupScreen from "../../../components/whatsapp/WhatsAppGroupScreen.jsx";

/**
 * @param {{ path: keyof typeof NEWS_SHARE_BY_PATH }} props
 */
export default function WhatsAppGroupNewsShareScreen({ path }) {
  const share = NEWS_SHARE_BY_PATH[path];
  const subtitles = {
    call: "You shared the article — called Rafi first",
    send: "You shared the article — after losing Free Fire",
    ignore: "You shared the article — ignored the scam chat",
  };

  return (
    <WhatsAppGroupScreen
      messages={share.groupMessages}
      subtitle={subtitles[path]}
    />
  );
}

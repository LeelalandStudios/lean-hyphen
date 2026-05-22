import { GROUP_SHARE_BY_PATH } from "../../../content/scenario4.js";
import WhatsAppGroupScreen from "../../../components/whatsapp/WhatsAppGroupScreen.jsx";

/** @param {{ path: keyof typeof GROUP_SHARE_BY_PATH }} props */
export default function WhatsAppGroupScenario4ShareScreen({ path }) {
  const share = GROUP_SHARE_BY_PATH[path];
  const subtitles = {
    tap: "Shared warning — after clicking fake portal",
    check: "Shared warning — spotted fake domain",
    forward: "Shared warning — after forwarding scam email",
  };

  return (
    <WhatsAppGroupScreen messages={share.groupMessages} subtitle={subtitles[path]} />
  );
}

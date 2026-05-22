import { PATH_B_GROUP_MESSAGES } from "../../content/scenario1.js";
import WhatsAppGroupScreen from "../../components/whatsapp/WhatsAppGroupScreen.jsx";

/** Path B — Zack lost ₹3,000; Priya names the pattern. */
export default function WhatsAppGroupPathBScreen() {
  return (
    <WhatsAppGroupScreen
      messages={PATH_B_GROUP_MESSAGES}
      subtitle="Zack got scammed"
    />
  );
}

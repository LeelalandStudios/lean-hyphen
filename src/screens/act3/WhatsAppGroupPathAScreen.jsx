import { PATH_A_GROUP_MESSAGES } from "../../content/scenario1.js";
import WhatsAppGroupScreen from "../../components/whatsapp/WhatsAppGroupScreen.jsx";

/** Path A — you post in group; Priya names what to watch for. */
export default function WhatsAppGroupPathAScreen() {
  return (
    <WhatsAppGroupScreen
      messages={PATH_A_GROUP_MESSAGES}
      subtitle="after you check PhonePe"
    />
  );
}

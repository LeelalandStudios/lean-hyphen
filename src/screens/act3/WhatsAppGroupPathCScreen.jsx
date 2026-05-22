import { PATH_C_GROUP_MESSAGES } from "../../content/scenario1.js";
import WhatsAppGroupScreen from "../../components/whatsapp/WhatsAppGroupScreen.jsx";

/** Path C — forward, angry group, Priya on not forwarding. */
export default function WhatsAppGroupPathCScreen() {
  return (
    <WhatsAppGroupScreen
      messages={PATH_C_GROUP_MESSAGES}
      subtitle="group upset"
    />
  );
}

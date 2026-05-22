import { ZOMATO_SAFE_GROUP_MESSAGES } from "../../../content/zomatoMini.js";
import WhatsAppGroupScreen from "../../../components/whatsapp/WhatsAppGroupScreen.jsx";

/** Zomato mini — player warns the group; friends agree. */
export default function WhatsAppGroupZomatoSafeScreen() {
  return (
    <WhatsAppGroupScreen
      messages={ZOMATO_SAFE_GROUP_MESSAGES}
      subtitle="scam avoided"
    />
  );
}

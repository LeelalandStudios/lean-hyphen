import { ZOMATO_FOOD_PLANNING_MESSAGES } from "../../../content/zomatoMini.js";
import WhatsAppGroupScreen from "../../../components/whatsapp/WhatsAppGroupScreen.jsx";

/** Zomato mini — group plans to order food. */
export default function WhatsAppGroupFoodPlanningScreen() {
  return (
    <WhatsAppGroupScreen
      messages={ZOMATO_FOOD_PLANNING_MESSAGES}
      subtitle="ordering food"
    />
  );
}

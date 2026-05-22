import {
  ZOMATO_ARYAN_FORWARD_MESSAGES,
  ZOMATO_SINGLE_CHOICE,
} from "../../../content/zomatoMini.js";
import GroupChatThread from "../../../components/whatsapp/GroupChatThread.jsx";
import SingleChoiceFooter from "../../../components/whatsapp/SingleChoiceFooter.jsx";
import WhatsAppShell from "../../../components/whatsapp/WhatsAppShell.jsx";
import { FRIENDS_GROUP } from "../../../content/act1Scene2.js";

/** Zomato mini — Aryan forwards voucher; one action at bottom. */
export default function WhatsAppGroupZomatoForwardScreen() {
  return (
    <WhatsAppShell title={FRIENDS_GROUP.title} subtitle="Aryan shared a link">
      <GroupChatThread messages={ZOMATO_ARYAN_FORWARD_MESSAGES} />
      <SingleChoiceFooter label={ZOMATO_SINGLE_CHOICE.label} />
    </WhatsAppShell>
  );
}

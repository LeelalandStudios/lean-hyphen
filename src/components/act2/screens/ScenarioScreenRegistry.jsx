import YouTubeDeepfakeScreen from "./YouTubeDeepfakeScreen.jsx";
import InstagramThreatScreen from "./InstagramThreatScreen.jsx";
import OtpMessagesScreen from "./OtpMessagesScreen.jsx";
import FakeFriendWhatsAppScreen from "./FakeFriendWhatsAppScreen.jsx";
import BgmiThreatScreen from "./BgmiThreatScreen.jsx";

export const ACT2_SCREEN_COMPONENTS = {
  "youtube-deepfake": YouTubeDeepfakeScreen,
  "instagram-threat": InstagramThreatScreen,
  "otp-messages": OtpMessagesScreen,
  "fake-friend-whatsapp": FakeFriendWhatsAppScreen,
  "bgmi-threat": BgmiThreatScreen,
};

export function getAct2ScreenComponent(screenType) {
  return ACT2_SCREEN_COMPONENTS[screenType] ?? YouTubeDeepfakeScreen;
}

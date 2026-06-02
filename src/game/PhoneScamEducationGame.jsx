import SceneIndex from "../catalog/SceneIndex.jsx";
import StaticScreenCatalog from "../catalog/StaticScreenCatalog.jsx";
import ChatCatalog from "../catalog/ChatCatalog.jsx";
import LessonApp from "../app/LessonApp.jsx";

/**
 * Default: lesson web app (Act sidebar + live scenes).
 * ?index=1   — scene index (playable scenes: live, legacy, planned)
 * ?catalog=1 — static screen catalog (individual story frames)
 * ?chats=1   — chat catalog (YAML chat preview)
 */
export default function PhoneScamEducationGame() {
  if (typeof window === "undefined") return <LessonApp />;

  const params = new URLSearchParams(window.location.search);

  if (params.get("index") === "1") return <SceneIndex />;
  if (params.get("catalog") === "1") return <StaticScreenCatalog />;
  if (params.get("chats") === "1") return <ChatCatalog />;

  return <LessonApp />;
}

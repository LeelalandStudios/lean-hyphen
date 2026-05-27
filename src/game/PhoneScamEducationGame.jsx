import StaticScreenCatalog from "../catalog/StaticScreenCatalog.jsx";
import LessonApp from "../app/LessonApp.jsx";

/**
 * Default: lesson web app (Act sidebar + Phone Explorer in Act 3).
 * Add ?catalog=1 for the Screen Catalog (static design review).
 */
export default function PhoneScamEducationGame() {
  const catalog =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("catalog") === "1";

  if (catalog) return <StaticScreenCatalog />;
  return <LessonApp />;
}

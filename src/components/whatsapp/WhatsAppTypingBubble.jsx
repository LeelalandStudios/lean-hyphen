/**
 * Incoming typing indicator — WhatsApp-style sequential dot pulse (not bounce).
 * @param {{ speed?: number }} props — 1 = normal; higher = faster (Act 1 fast-forward).
 */
export default function WhatsAppTypingBubble({ speed = 1 }) {
  const duration = `${1.15 / speed}s`;

  return (
    <div className="flex justify-start">
      <div className="rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
        <div className="flex h-5 items-center gap-[5px]" aria-label="Typing">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-block h-[7px] w-[7px] rounded-full bg-[#8696a0]"
              style={{
                animation: `waTypingDot ${duration} ease-in-out infinite`,
                animationDelay: `${(i * 0.18) / speed}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

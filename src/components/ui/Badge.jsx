/**
 * Small rounded pill, used for eyebrow labels ("New Feature", location
 * tags, etc). Accepts a `tone` so it can sit on either a dark photo
 * background or a light surface.
 */
export default function Badge({ children, tone = "light" }) {
  const toneClasses =
    tone === "light"
      ? "bg-white/15 text-white backdrop-blur-sm border border-white/20"
      : "bg-[color:var(--color-accent-500)]/15 text-[color:var(--color-accent-600)] border border-[color:var(--color-accent-500)]/30";

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${toneClasses}`}>
      {children}
    </span>
  );
}
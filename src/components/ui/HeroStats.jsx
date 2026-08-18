/**
 * Horizontal row of small stats, separated by dividers. Mirrors the
 * "trust strip directly under the hero" pattern from the reference
 * designs (Yow Island's logo row, Gridfox's "300+ companies" line).
 *
 * @param {{ value: string, label: string }[]} stats
 * @param {"light"|"dark"} tone - light text for dark backgrounds, dark text for light ones
 */
export default function HeroStats({ stats, tone = "light" }) {
  const valueClass = tone === "light" ? "text-white" : "text-[color:var(--color-neutral-900)]";
  const labelClass = tone === "light" ? "text-white/70" : "text-[color:var(--color-neutral-600)]";
  const dividerClass = tone === "light" ? "bg-white/20" : "bg-[color:var(--color-neutral-200)]";

  return (
    <div className="flex items-center gap-6">
      {stats.map((stat, index) => (
        <div key={stat.label} className="flex items-center gap-6">
          {index > 0 && <span className={`w-px h-8 ${dividerClass}`} aria-hidden="true" />}
          <div>
            <p className={`text-xl font-semibold ${valueClass}`}>{stat.value}</p>
            <p className={`text-xs ${labelClass}`}>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
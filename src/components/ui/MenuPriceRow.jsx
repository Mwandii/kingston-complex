/**
 * A single menu line with a dotted leader line connecting the item
 * name to its price — the layout pattern from the reference menus,
 * reskinned in our warm palette instead of their dark theme.
 */
export default function MenuPriceRow({ name, price }) {
  return (
    <div className="flex items-baseline gap-2 py-1.5">
      <span className="text-sm text-[color:var(--color-neutral-900)] whitespace-nowrap">{name}</span>
      <span className="flex-1 border-b border-dotted border-[color:var(--color-neutral-400)] -translate-y-1" />
      <span className="text-sm font-semibold text-[color:var(--color-accent-600)] whitespace-nowrap">{price}</span>
    </div>
  );
}
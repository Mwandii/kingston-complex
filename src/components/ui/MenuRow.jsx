/**
 * Single menu line item — name and price. `dark` flips it for use on
 * dark section backgrounds (the Bar section sits on a dark surface).
 */
export default function MenuRow({ name, price, dark = false }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
        dark
          ? "border-white/10 bg-white/5"
          : "border-[color:var(--color-neutral-200)] bg-[color:var(--color-neutral-50)]"
      }`}
    >
      <p className={dark ? "text-white/90" : "text-[color:var(--color-neutral-700)]"}>{name}</p>
      <p className={dark ? "text-[color:var(--color-accent-400)] font-medium" : "text-[color:var(--color-accent-600)] font-medium"}>
        {price}
      </p>
    </div>
  );
}
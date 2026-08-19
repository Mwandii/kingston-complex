import { Link } from "react-router-dom";
import { IconShower, IconTv, IconCoffee, IconDesk, IconWater } from "./icons";

const amenityIconMap = {
  shower: { Icon: IconShower, label: "Hot shower" },
  tv: { Icon: IconTv, label: "TV" },
  coffee: { Icon: IconCoffee, label: "Breakfast" },
  desk: { Icon: IconDesk, label: "Work desk" },
  water: { Icon: IconWater, label: "Bottled water" },
};

/**
 * Room tier card — photo, price, amenity icons. `featured` gives it a
 * subtle accent border so the recommended tier stands out in a row.
 * Links through to /rooms (or a specific room once Rooms.jsx has
 * per-room anchors).
 */
export default function RoomCard({ room }) {
  const { name, price, priceUnit, image, amenities, featured, id } = room;

  return (
    <Link
      to={`/rooms#${id}`}
      className={`group block rounded-2xl overflow-hidden border transition-shadow hover:shadow-lg ${
        featured
          ? "border-[color:var(--color-accent-500)] shadow-md"
          : "border-[color:var(--color-neutral-200)]"
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-[color:var(--color-neutral-100)]">
        <img
          src={image.url}
          alt={image.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(event) => (event.currentTarget.style.display = "none")}
        />
      </div>

      <div className="p-5 bg-white">
        <div className="flex items-baseline justify-between mb-1">
          <p className="font-semibold text-[color:var(--color-neutral-900)]">{name}</p>
          {featured && (
            <span className="text-[11px] font-medium text-[color:var(--color-accent-600)] bg-[color:var(--color-accent-500)]/10 px-2 py-0.5 rounded-full">
              Most booked
            </span>
          )}
        </div>

        <p className="text-sm text-[color:var(--color-neutral-600)] mb-4">
          <span className="font-semibold text-[color:var(--color-neutral-900)]">{price}</span> {priceUnit}
        </p>

        <div className="flex flex-wrap gap-3">
          {amenities.map((key) => {
            const amenity = amenityIconMap[key];
            if (!amenity) return null;
            const { Icon, label } = amenity;
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 text-xs text-[color:var(--color-neutral-600)]"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
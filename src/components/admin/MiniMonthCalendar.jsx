import { useState } from "react";
import { toDateKey } from "../../utils/date";

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * @param {Set<string>} bookedDateKeys - dates ("YYYY-MM-DD") that have at least one booking
 * @param {string} selectedDateKey - currently selected date
 * @param {(dateKey: string) => void} onSelectDate
 */
export default function MiniMonthCalendar({ bookedDateKeys, selectedDateKey, onSelectDate }) {
  const [viewDate, setViewDate] = useState(() => {
    const [year, month] = selectedDateKey.split("-").map(Number);
    return new Date(year, month - 1, 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstWeekday).fill(null), ...Array(daysInMonth).keys()].map((d) =>
    d === null ? null : d + 1
  );

  const goToMonth = (offset) => setViewDate(new Date(year, month + offset, 1));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <button
          type="button"
          onClick={() => goToMonth(-1)}
          aria-label="Previous month"
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md hover:bg-[color:var(--color-neutral-100)] text-[color:var(--color-neutral-500)] shrink-0"
        >
          ‹
        </button>

        <p className="text-xs sm:text-sm font-medium text-[color:var(--color-neutral-900)] text-center px-2">
          {viewDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
        </p>

        <button
          type="button"
          onClick={() => goToMonth(1)}
          aria-label="Next month"
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md hover:bg-[color:var(--color-neutral-100)] text-[color:var(--color-neutral-500)] shrink-0"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-center">
        {WEEKDAY_LABELS.map((label, index) => (
          <div
            key={`${label}-${index}`}
            className="text-[9px] sm:text-[10px] text-[color:var(--color-neutral-400)] font-medium py-1"
          >
            {label}
          </div>
        ))}

        {cells.map((day, index) => {
          if (day === null) return <div key={`blank-${index}`} />;

          const dateKey = toDateKey(new Date(year, month, day));
          const isSelected = dateKey === selectedDateKey;
          const isBooked = bookedDateKeys.has(dateKey);

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onSelectDate(dateKey)}
              className={`relative h-7 sm:h-8 flex items-center justify-center text-xs sm:text-[13px] rounded-md transition-colors ${
                isSelected
                  ? "bg-[color:var(--color-brand-800)] text-white font-medium"
                  : "text-[color:var(--color-neutral-700)] hover:bg-[color:var(--color-neutral-100)]"
              }`}
            >
              {day}
              {isBooked && !isSelected && (
                <span className="absolute bottom-0.5 sm:bottom-1 w-1 h-1 rounded-full bg-[color:var(--color-accent-500)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
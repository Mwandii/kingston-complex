import { useMemo, useState } from "react";
import { useRoomBookings } from "../hooks/useRoomBookings";
import { useConferenceBookings } from "../hooks/useConferenceBookings";
import { useBarBookings } from "../hooks/useBarBookings";
import { mergeBookings } from "../utils/mergeBookings";
import { toDateKey, addDays, getMonthStartKey, getYearStartKey } from "../utils/date";

const PERIODS = [
  { value: "today", label: "Today" },
  { value: "week", label: "Last 7 days" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
];

const CATEGORY_LABELS = { rooms: "Rooms", conference: "Conference hall", bar: "Bar" };

/**
 * Revenue is bucketed by `createdAt` (when the booking — and therefore
 * the payment — was actually recorded), not by the stay/event date.
 * Every row in the system already represents money collected (no
 * "pending" bookings), so createdAt is the true date the cash came in,
 * even if the stay itself is weeks in the future.
 */
export default function AdminFinance() {
  const { bookings: roomBookings, isLoading: roomsLoading } = useRoomBookings();
  const { bookings: conferenceBookings, isLoading: conferenceLoading } = useConferenceBookings();
  const { bookings: barBookings, isLoading: barLoading } = useBarBookings();
  const [period, setPeriod] = useState("month");

  const isLoading = roomsLoading || conferenceLoading || barLoading;

  const allRows = useMemo(
    () => mergeBookings(roomBookings, conferenceBookings, barBookings),
    [roomBookings, conferenceBookings, barBookings]
  );

  const todayKey = useMemo(() => toDateKey(new Date()), []);

  const periodStartKey = useMemo(() => {
    switch (period) {
      case "today":
        return todayKey;
      case "week":
        return toDateKey(addDays(new Date(), -6));
      case "month":
        return getMonthStartKey();
      case "year":
        return getYearStartKey();
      default:
        return todayKey;
    }
  }, [period, todayKey]);

  const rowsInPeriod = useMemo(
    () =>
      allRows.filter((row) => {
        const createdDateKey = row.createdAt.slice(0, 10);
        return createdDateKey >= periodStartKey && createdDateKey <= todayKey;
      }),
    [allRows, periodStartKey, todayKey]
  );

  const breakdown = useMemo(() => {
    const totals = { rooms: 0, conference: 0, bar: 0 };
    const counts = { rooms: 0, conference: 0, bar: 0 };

    rowsInPeriod.forEach((row) => {
      totals[row.category] += Number(row.amount);
      counts[row.category] += 1;
    });

    const grandTotal = totals.rooms + totals.conference + totals.bar;
    return { totals, counts, grandTotal };
  }, [rowsInPeriod]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-[color:var(--color-neutral-900)] mb-6">Finance</h1>

      <div className="flex gap-2 mb-6">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
              period === p.value
                ? "bg-[color:var(--color-brand-800)] text-white"
                : "bg-white border border-[color:var(--color-neutral-200)] text-[color:var(--color-neutral-600)]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-sm text-[color:var(--color-neutral-500)]">Loading...</p>
      ) : (
        <>
          <div className="bg-[color:var(--color-brand-950)] rounded-xl p-6 mb-6">
            <p className="text-sm text-white/60">Total revenue — {PERIODS.find((p) => p.value === period).label}</p>
            <p className="text-3xl font-semibold text-white mt-1">KSh {breakdown.grandTotal.toLocaleString()}</p>
            <p className="text-xs text-white/50 mt-1">{rowsInPeriod.length} bookings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <div key={key} className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] p-5">
                <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">{label}</p>
                <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                  KSh {breakdown.totals[key].toLocaleString()}
                </p>
                <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">
                  {breakdown.counts[key]} booking{breakdown.counts[key] === 1 ? "" : "s"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
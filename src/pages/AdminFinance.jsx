import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useRoomBookings } from "../hooks/useRoomBookings";
import { useConferenceBookings } from "../hooks/useConferenceBookings";
import { useBarBookings } from "../hooks/useBarBookings";
import { mergeBookings } from "../utils/mergeBookings";
import {
  toDateKey,
  parseDateKey,
  addDays,
  getWeekStartKey,
  getWeekEndKey,
  getMonthStartKey,
  getMonthEndKey,
  getYearStartKey,
  getYearEndKey,
  formatShortDate,
  formatMonthLabel,
} from "../utils/date";

const PERIODS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
];

const CATEGORY_LABELS = { rooms: "Rooms", conference: "Conference hall", bar: "Bar" };

/**
 * Revenue is bucketed by each booking's SERVICE date (check-in / event
 * date / conference date) — a booking's full total_price counts toward
 * the week/month it's actually delivered, regardless of when it was
 * paid. A full payment today for a stay next week counts as next
 * week's revenue; a deposit today + balance next week for the same
 * booking both count toward next week too, not split across two days.
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

  const { periodStart, periodEnd } = useMemo(() => {
    switch (period) {
      case "today":
        return { periodStart: todayKey, periodEnd: todayKey };
      case "week":
        return { periodStart: getWeekStartKey(), periodEnd: getWeekEndKey() };
      case "month":
        return { periodStart: getMonthStartKey(), periodEnd: getMonthEndKey() };
      case "year":
        return { periodStart: getYearStartKey(), periodEnd: getYearEndKey() };
      default:
        return { periodStart: todayKey, periodEnd: todayKey };
    }
  }, [period, todayKey]);

  const rowsInPeriod = useMemo(
    () => allRows.filter((row) => row.sortKey >= periodStart && row.sortKey <= periodEnd),
    [allRows, periodStart, periodEnd]
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

  const chartData = useMemo(() => {
    if (period === "today") return null;

    if (period === "year") {
      const year = parseDateKey(periodStart).getFullYear();
      const buckets = {};
      for (let month = 0; month < 12; month++) {
        buckets[`${year}-${String(month + 1).padStart(2, "0")}`] = 0;
      }
      rowsInPeriod.forEach((row) => {
        const key = row.sortKey.slice(0, 7);
        buckets[key] = (buckets[key] ?? 0) + Number(row.amount);
      });
      return Object.entries(buckets).map(([key, amount]) => ({ label: formatMonthLabel(key), amount }));
    }

    const buckets = {};
    let cursor = parseDateKey(periodStart);
    const end = parseDateKey(periodEnd);
    while (cursor <= end) {
      buckets[toDateKey(cursor)] = 0;
      cursor = addDays(cursor, 1);
    }
    rowsInPeriod.forEach((row) => {
      buckets[row.sortKey] = (buckets[row.sortKey] ?? 0) + Number(row.amount);
    });
    return Object.entries(buckets).map(([key, amount]) => ({ label: formatShortDate(key), amount }));
  }, [rowsInPeriod, period, periodStart, periodEnd]);

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
            <p className="text-sm text-white/60">Revenue — {PERIODS.find((p) => p.value === period).label}</p>
            <p className="text-3xl font-semibold text-white mt-1">KSh {breakdown.grandTotal.toLocaleString()}</p>
            <p className="text-xs text-white/50 mt-1">{rowsInPeriod.length} bookings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-6">
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

          {chartData && (
            <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] p-6">
              <p className="font-semibold text-[color:var(--color-neutral-900)] mb-4">Revenue trend</p>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e0d6" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#9c9788" />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    stroke="#9c9788"
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip formatter={(value) => [`KSh ${Number(value).toLocaleString()}`, "Revenue"]} />
                  <Line type="monotone" dataKey="amount" stroke="#115e59" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}
import { useMemo, useState } from "react";
import { useRoomBookings } from "../hooks/useRoomBookings";
import { useConferenceBookings } from "../hooks/useConferenceBookings";
import { useBarBookings } from "../hooks/useBarBookings";
import { toDateKey } from "../utils/date";
import { mergeBookings } from "../utils/mergeBookings";

export default function AdminBookings() {
  const { bookings: roomBookings, isLoading: roomsLoading, error: roomsError } = useRoomBookings();
  const {
    bookings: conferenceBookings,
    isLoading: conferenceLoading,
    error: conferenceError,
  } = useConferenceBookings();
  const { bookings: barBookings, isLoading: barLoading, error: barError } = useBarBookings();
  const [activeTab, setActiveTab] = useState("upcoming");

  const isLoading = roomsLoading || conferenceLoading || barLoading;
  const today = useMemo(() => toDateKey(new Date()), []);

  const allRows = useMemo(
    () => mergeBookings(roomBookings, conferenceBookings, barBookings),
    [roomBookings, conferenceBookings, barBookings]
  );

  // Upcoming: today and later, soonest first — what staff check daily.
  // History: before today, most recent first — checked occasionally.
  const visibleRows = useMemo(() => {
    if (activeTab === "upcoming") {
      return allRows
        .filter((row) => row.sortKey >= today)
        .sort((a, b) => a.sortKey.localeCompare(b.sortKey));
    }
    return allRows
      .filter((row) => row.sortKey < today)
      .sort((a, b) => b.sortKey.localeCompare(a.sortKey));
  }, [allRows, activeTab, today]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-[color:var(--color-neutral-900)] mb-6">Bookings</h1>

      {(roomsError || conferenceError || barError) && (
        <p className="text-sm text-red-600 mb-4">{roomsError || conferenceError || barError}</p>
      )}

      <div className="flex gap-2 mb-6">
        {[
          { value: "upcoming", label: "Upcoming" },
          { value: "history", label: "History" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
              activeTab === tab.value
                ? "bg-[color:var(--color-brand-800)] text-white"
                : "bg-white border border-[color:var(--color-neutral-200)] text-[color:var(--color-neutral-600)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] overflow-hidden">
        {isLoading ? (
          <p className="text-sm text-[color:var(--color-neutral-500)] p-6">Loading...</p>
        ) : visibleRows.length === 0 ? (
          <p className="text-sm text-[color:var(--color-neutral-500)] p-6">
            {activeTab === "upcoming" ? "No upcoming bookings." : "No past bookings yet."}
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[color:var(--color-neutral-500)] border-b border-[color:var(--color-neutral-100)]">
                <th className="px-6 py-3 font-medium">Service</th>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Detail</th>
                <th className="px-6 py-3 font-medium">Phone</th>
                <th className="px-6 py-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-neutral-100)]">
              {visibleRows.map((row) => (
                <tr key={row.id} className="text-[color:var(--color-neutral-700)]">
                  <td className="px-6 py-3 font-medium text-[color:var(--color-neutral-900)]">{row.service}</td>
                  <td className="px-6 py-3">{row.client}</td>
                  <td className="px-6 py-3">{row.dateDisplay}</td>
                  <td className="px-6 py-3 text-[color:var(--color-neutral-500)]">{row.detail}</td>
                  <td className="px-6 py-3 text-[color:var(--color-neutral-500)]">{row.phone}</td>
                  <td className="px-6 py-3">KSh {Number(row.amount).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
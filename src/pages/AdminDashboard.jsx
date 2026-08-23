import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRoomBookings } from "../hooks/useRoomBookings";
import { useConferenceBookings } from "../hooks/useConferenceBookings";
import { useBarBookings } from "../hooks/useBarBookings";
import { toDateKey, addDays, formatTime, formatDisplayDate, isDateWithinStay } from "../utils/date";
import { mergeBookings, ROOM_LABELS } from "../utils/mergeBookings";

export default function AdminDashboard() {
  const { session } = useAuth();
  const { bookings: roomBookings, isLoading: roomsLoading } = useRoomBookings();
  const { bookings: conferenceBookings, isLoading: conferenceLoading } = useConferenceBookings();
  const { bookings: barBookings, isLoading: barLoading } = useBarBookings();

  const firstName = session?.user?.email?.split("@")[0];
  const isLoading = roomsLoading || conferenceLoading || barLoading;

  const today = useMemo(() => toDateKey(new Date()), []);
  const weekEnd = useMemo(() => toDateKey(addDays(new Date(), 7)), []);

  const allRows = useMemo(
    () => mergeBookings(roomBookings, conferenceBookings, barBookings),
    [roomBookings, conferenceBookings, barBookings]
  );

  const conferenceToday = useMemo(
    () => conferenceBookings.filter((b) => b.booking_date === today),
    [conferenceBookings, today]
  );
  const nextConference = useMemo(() => {
    if (conferenceToday.length > 0) return null;
    return conferenceBookings
      .filter((b) => b.booking_date > today)
      .sort((a, b) => a.booking_date.localeCompare(b.booking_date))[0];
  }, [conferenceBookings, conferenceToday, today]);

  const roomsOccupiedToday = useMemo(
    () => roomBookings.filter((b) => isDateWithinStay(today, b.check_in, b.check_out)),
    [roomBookings, today]
  );
  const nextRoomCheckIn = useMemo(() => {
    if (roomsOccupiedToday.length > 0) return null;
    return roomBookings
      .filter((b) => b.check_in > today)
      .sort((a, b) => a.check_in.localeCompare(b.check_in))[0];
  }, [roomBookings, roomsOccupiedToday, today]);

  const weekRows = useMemo(
    () =>
      allRows
        .filter((row) => row.sortKey >= today && row.sortKey < weekEnd)
        .sort((a, b) => a.sortKey.localeCompare(b.sortKey)),
    [allRows, today, weekEnd]
  );
  const weekRevenue = useMemo(
    () => weekRows.reduce((sum, row) => sum + Number(row.amount), 0),
    [weekRows]
  );

  const recentActivity = useMemo(
    () => [...allRows].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5),
    [allRows]
  );

  return (
    <div>
      <h1 className="text-xl font-semibold text-[color:var(--color-neutral-900)]">
        Welcome{firstName ? `, ${firstName}` : ""}
      </h1>
      <p className="text-sm text-[color:var(--color-neutral-500)] mt-1 mb-6">Here's what's happening today.</p>

      {isLoading ? (
        <p className="text-sm text-[color:var(--color-neutral-500)]">Loading...</p>
      ) : (
        <>
          <div className="grid md:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] border-l-4 border-l-[color:var(--color-accent-500)] p-5">
              <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">Conference hall today</p>
              {conferenceToday.length > 0 ? (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                    {formatTime(conferenceToday[0].start_time)} – {formatTime(conferenceToday[0].end_time)}
                  </p>
                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">
                    {conferenceToday[0].client_name}
                    {conferenceToday.length > 1 ? ` +${conferenceToday.length - 1} more` : ""}
                  </p>
                </>
              ) : nextConference ? (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">Free today</p>
                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">
                    Next: {formatDisplayDate(nextConference.booking_date)} — {nextConference.client_name}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">Free today</p>
                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">No upcoming bookings</p>
                </>
              )}
            </div>

            <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] border-l-4 border-l-[color:var(--color-brand-800)] p-5">
              <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">Rooms occupied today</p>
              {roomsOccupiedToday.length > 0 ? (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                    {roomsOccupiedToday.length} of 3 tiers
                  </p>
                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">
                    {roomsOccupiedToday.map((b) => ROOM_LABELS[b.room_type]?.replace(" room", "")).join(", ")}
                  </p>
                </>
              ) : nextRoomCheckIn ? (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                    All rooms free
                  </p>
                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">
                    Next check-in: {formatDisplayDate(nextRoomCheckIn.check_in)}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                    All rooms free
                  </p>
                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">No upcoming bookings</p>
                </>
              )}
            </div>

            <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] border-l-4 border-l-[color:var(--color-brand-900)] p-5">
              <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">Next 7 days</p>
              <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                {weekRows.length} booking{weekRows.length === 1 ? "" : "s"}
              </p>
              <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">Rooms &amp; conference combined</p>
            </div>

            <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] border-l-4 border-l-[color:var(--color-accent-600)] p-5">
              <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">Revenue, next 7 days</p>
              <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                KSh {weekRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">From confirmed bookings</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-[color:var(--color-neutral-200)] p-6">
              <p className="font-semibold text-[color:var(--color-neutral-900)] mb-4">This week's schedule</p>
              {weekRows.length === 0 ? (
                <p className="text-sm text-[color:var(--color-neutral-500)]">Nothing booked in the next 7 days.</p>
              ) : (
                <div className="space-y-3">
                  {weekRows.map((row) => (
                    <div
                      key={row.id}
                      className="flex items-center justify-between border border-[color:var(--color-neutral-200)] rounded-lg px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-[color:var(--color-neutral-900)]">
                          {row.service} · {row.client}
                        </p>
                        <p className="text-xs text-[color:var(--color-neutral-500)]">
                          {row.dateDisplay} · {row.detail}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-[color:var(--color-neutral-900)]">
                        KSh {Number(row.amount).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-[color:var(--color-neutral-900)]">Recent activity</p>
                <Link to="/admin/bookings" className="text-xs text-[color:var(--color-brand-800)] font-medium">
                  View all
                </Link>
              </div>
              {recentActivity.length === 0 ? (
                <p className="text-sm text-[color:var(--color-neutral-500)]">No bookings added yet.</p>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((row) => (
                    <div key={row.id}>
                      <p className="text-sm text-[color:var(--color-neutral-900)]">
                        <span className="font-medium">{row.client}</span> booked {row.service.toLowerCase()}
                      </p>
                      <p className="text-xs text-[color:var(--color-neutral-400)]">
                        Added {formatDisplayDate(row.createdAt.slice(0, 10))}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
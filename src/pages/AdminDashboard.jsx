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
    <div className="w-full min-w-0">
      <h1 className="text-xl font-semibold text-[color:var(--color-neutral-900)] break-words">
        Welcome{firstName ? `, ${firstName}` : ""}
      </h1>

      <p className="text-sm text-[color:var(--color-neutral-500)] mt-1 mb-6">
        Here's what's happening today.
      </p>

      {isLoading ? (
        <p className="text-sm text-[color:var(--color-neutral-500)]">Loading...</p>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
            <div className="min-w-0 bg-white rounded-xl border border-[color:var(--color-neutral-200)] border-l-4 border-l-[color:var(--color-accent-500)] p-4 sm:p-5">
              <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">
                Conference hall today
              </p>

              {conferenceToday.length > 0 ? (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1 break-words">
                    {formatTime(conferenceToday[0].start_time)} –{" "}
                    {formatTime(conferenceToday[0].end_time)}
                  </p>

                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1 break-words">
                    {conferenceToday[0].client_name}
                    {conferenceToday.length > 1 ? ` +${conferenceToday.length - 1} more` : ""}
                  </p>
                </>
              ) : nextConference ? (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                    Free today
                  </p>

                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1 break-words">
                    Next: {formatDisplayDate(nextConference.booking_date)} —{" "}
                    {nextConference.client_name}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                    Free today
                  </p>

                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">
                    No upcoming bookings
                  </p>
                </>
              )}
            </div>

            <div className="min-w-0 bg-white rounded-xl border border-[color:var(--color-neutral-200)] border-l-4 border-l-[color:var(--color-brand-800)] p-4 sm:p-5">
              <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">
                Rooms occupied today
              </p>

              {roomsOccupiedToday.length > 0 ? (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                    {roomsOccupiedToday.length} of 3 tiers
                  </p>

                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1 break-words">
                    {roomsOccupiedToday
                      .map((b) => ROOM_LABELS[b.room_type]?.replace(" room", ""))
                      .join(", ")}
                  </p>
                </>
              ) : nextRoomCheckIn ? (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                    All rooms free
                  </p>

                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1 break-words">
                    Next check-in: {formatDisplayDate(nextRoomCheckIn.check_in)}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                    All rooms free
                  </p>

                  <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">
                    No upcoming bookings
                  </p>
                </>
              )}
            </div>

            <div className="min-w-0 bg-white rounded-xl border border-[color:var(--color-neutral-200)] border-l-4 border-l-[color:var(--color-brand-900)] p-4 sm:p-5">
              <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">
                Next 7 days
              </p>

              <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                {weekRows.length} booking{weekRows.length === 1 ? "" : "s"}
              </p>

              <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">
                Rooms &amp; conference combined
              </p>
            </div>

            <div className="min-w-0 bg-white rounded-xl border border-[color:var(--color-neutral-200)] border-l-4 border-l-[color:var(--color-accent-600)] p-4 sm:p-5">
              <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">
                Revenue, next 7 days
              </p>

              <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1 break-words">
                KSh {weekRevenue.toLocaleString()}
              </p>

              <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">
                From confirmed bookings
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 min-w-0">
            {/* Weekly schedule */}
            <div className="min-w-0 lg:col-span-2 bg-white rounded-xl border border-[color:var(--color-neutral-200)] p-4 sm:p-6">
              <p className="font-semibold text-[color:var(--color-neutral-900)] mb-4">
                This week's schedule
              </p>

              {weekRows.length === 0 ? (
                <p className="text-sm text-[color:var(--color-neutral-500)]">
                  Nothing booked in the next 7 days.
                </p>
              ) : (
                <div className="space-y-3">
                  {weekRows.map((row) => (
                    <div
                      key={row.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 border border-[color:var(--color-neutral-200)] rounded-lg px-3 sm:px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[color:var(--color-neutral-900)] break-words">
                          {row.service} · {row.client}
                        </p>

                        <p className="text-xs text-[color:var(--color-neutral-500)] break-words">
                          {row.dateDisplay} · {row.detail}
                        </p>
                      </div>

                      <p className="text-sm font-medium text-[color:var(--color-neutral-900)] whitespace-nowrap sm:self-center">
                        KSh {Number(row.amount).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent activity */}
            <div className="min-w-0 bg-white rounded-xl border border-[color:var(--color-neutral-200)] p-4 sm:p-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="font-semibold text-[color:var(--color-neutral-900)]">
                  Recent activity
                </p>

                <Link
                  to="/admin/bookings"
                  className="text-xs text-[color:var(--color-brand-800)] font-medium whitespace-nowrap"
                >
                  View all
                </Link>
              </div>

              {recentActivity.length === 0 ? (
                <p className="text-sm text-[color:var(--color-neutral-500)]">
                  No bookings added yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((row) => (
                    <div key={row.id} className="min-w-0">
                      <p className="text-sm text-[color:var(--color-neutral-900)] break-words">
                        <span className="font-medium">{row.client}</span> booked{" "}
                        {row.service.toLowerCase()}
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

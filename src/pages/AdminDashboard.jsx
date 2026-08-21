import { useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRoomBookings } from "../hooks/useRoomBookings";
import { useConferenceBookings } from "../hooks/useConferenceBookings";
import { toDateKey, addDays, formatTime, isDateWithinStay } from "../utils/date";

const ROOM_LABELS = { standard: "Standard", deluxe: "Deluxe", executive: "Executive" };

export default function AdminDashboard() {
  const { session } = useAuth();
  const { bookings: roomBookings, isLoading: roomsLoading } = useRoomBookings();
  const { bookings: conferenceBookings, isLoading: conferenceLoading } = useConferenceBookings();

  const firstName = session?.user?.email?.split("@")[0];
  const isLoading = roomsLoading || conferenceLoading;

  const today = useMemo(() => toDateKey(new Date()), []);
  const weekEnd = useMemo(() => toDateKey(addDays(new Date(), 7)), []);

  const conferenceToday = useMemo(
    () => conferenceBookings.filter((b) => b.booking_date === today),
    [conferenceBookings, today]
  );

  const roomsOccupiedToday = useMemo(
    () => roomBookings.filter((b) => isDateWithinStay(today, b.check_in, b.check_out)),
    [roomBookings, today]
  );

  const upcomingWeekCount = useMemo(() => {
    const roomsThisWeek = roomBookings.filter((b) => b.check_in >= today && b.check_in < weekEnd).length;
    const conferenceThisWeek = conferenceBookings.filter(
      (b) => b.booking_date >= today && b.booking_date < weekEnd
    ).length;
    return roomsThisWeek + conferenceThisWeek;
  }, [roomBookings, conferenceBookings, today, weekEnd]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-[color:var(--color-neutral-900)]">
        Welcome{firstName ? `, ${firstName}` : ""}
      </h1>
      <p className="text-sm text-[color:var(--color-neutral-500)] mt-1 mb-6">Here's what's happening today.</p>

      {isLoading ? (
        <p className="text-sm text-[color:var(--color-neutral-500)]">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] border-l-4 border-l-[color:var(--color-accent-500)] p-5">
            <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">Conference hall today</p>
            {conferenceToday.length === 0 ? (
              <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">Free all day</p>
            ) : (
              <>
                <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
                  {formatTime(conferenceToday[0].start_time)} – {formatTime(conferenceToday[0].end_time)}
                </p>
                <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">
                  {conferenceToday[0].client_name}
                  {conferenceToday.length > 1 ? ` +${conferenceToday.length - 1} more` : ""}
                </p>
              </>
            )}
          </div>

          <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] border-l-4 border-l-[color:var(--color-brand-800)] p-5">
            <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">Rooms occupied today</p>
            <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
              {roomsOccupiedToday.length} of 3 tiers
            </p>
            <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">
              {roomsOccupiedToday.length === 0
                ? "All rooms free"
                : roomsOccupiedToday.map((b) => ROOM_LABELS[b.room_type]).join(", ")}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] border-l-4 border-l-[color:var(--color-brand-900)] p-5">
            <p className="text-xs font-medium text-[color:var(--color-neutral-500)]">Next 7 days</p>
            <p className="text-lg font-semibold text-[color:var(--color-neutral-900)] mt-1">
              {upcomingWeekCount} booking{upcomingWeekCount === 1 ? "" : "s"}
            </p>
            <p className="text-xs text-[color:var(--color-neutral-400)] mt-1">Rooms &amp; conference combined</p>
          </div>
        </div>
      )}
    </div>
  );
}
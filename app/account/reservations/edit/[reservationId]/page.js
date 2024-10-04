import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservation } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking, getBookings, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  // CHANGE
  const session = await auth();
  const booking = await getBooking(params.reservationId);
  const cabin = await getCabin(booking.cabinId);
  const guestBookings = await getBookings(session.user.guestId);
  const reservationId = params.reservationId;
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(Number(reservationId))) {
    throw new Error("You are not authorized to edit this reservation");
  }

  const maxCapacity = cabin.maxCapacity;
  console.log(params.reservationId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservation}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>
        <input type="hidden" name="reservationId" value={reservationId} />
        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingText="Updating...">
            Update Reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

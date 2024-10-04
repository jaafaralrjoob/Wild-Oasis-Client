import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(req, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ error: "Cabin not found" }, { status: 404 });
  }
}

// export async function POST(req, res) {
//   return auth(req, res);
// }

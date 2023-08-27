import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { eventId, existingEvents } = await request.json();
  const newParticipantId = eventId.newParticipant;
  const existingParticipantIds = eventId.participant || [];
  const updatedParticipantIds = [...existingParticipantIds, newParticipantId];

  const newEventId = eventId.id;
  const updatedEventIds = [...existingEvents, newEventId];
  const { error } = await supabase
    .from("events")
    .update({ participantids: updatedParticipantIds })
    .eq("id", eventId.id);
  if (error) {
    return NextResponse.error();
  }
  const { data, error: error1 } = await supabase
    .from("users")
    .update({ events: updatedEventIds })
    .eq("id", newParticipantId);
  if (error1) {
    return NextResponse.error();
  }
  return NextResponse.json(data);
}

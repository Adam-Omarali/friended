import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createServerComponentClient({ cookies });
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

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface space {
  id: string;
  name: string;
  description: string;
  public: boolean;
  organizationid: string;
  participantids: string[];
}

export async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const { data: spaces, error } = await supabase.from("spaces").select();

  return (
    <div className="p-4">
      {spaces?.map(async (space) => {
        const { data: organizer } = await supabase
          .from("organizations")
          .select("name")
          .eq("id", `${space.organizationid as string}`);
        return (
          <div className="">
            <div className="flex justify-between align-center w-full">
              <h1>{space.name}</h1>
              <p>Organized by {organizer ? organizer[0].name : ""}</p>
            </div>
            <div className="flex justify-between w-full">
              <p>{space.description}</p>
              <p>
                {space.participantids ? space.participantids.length : 0}{" "}
                Participants
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Page;

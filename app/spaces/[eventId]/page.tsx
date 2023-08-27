import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import "../../styles.css";

export default async function Page({ params }: { params: any }) {
  const eventId = params.eventId;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
    {
      db: {
        schema: "public",
      },
    }
  );

  const supabaseNext = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
    {
      db: {
        schema: "next_auth",
      },
    }
  );

  let { data: allEvents } = await supabase.from("events").select();
  let { data: allUsers } = await supabase.from("users").select();
  let { data: nextAuthUsers } = await supabaseNext.from("users").select();
  allEvents = allEvents || [];
  const slugEvent = allEvents.find((event: any) => event.id === eventId);
  if (!slugEvent) {
    return <div>Slug doesn't correspond to an event, please try again</div>;
  } else {
    const UserList = () => (
      <ul>
        {slugEvent.participantids.map((partId: any) => {
          allUsers = allUsers || [];
          nextAuthUsers = nextAuthUsers || [];
          const findUser = allUsers.find((user: any) => user.id === partId);
          console.log(findUser);
          console.log(findUser.name);
          const findAuth = nextAuthUsers.find(
            (user: any) => user.id === partId
          );
          // console.log(findAuth);
          return (
            <li key={partId}>
              <Image
                src={findAuth.image}
                width={100}
                height={100}
                alt={"profile-picture"}
                className="bor"
              />
              Name: {findUser.username}
            </li>
          );
          return null;
        })}
      </ul>
    );

    return (
      <div>
        <h1>EventName: {slugEvent.name}</h1>
        <h2>Description: {slugEvent.description}</h2>
        <h3>Users:</h3>
        <UserList />
      </div>
    );
  }
}

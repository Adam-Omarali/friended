import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import "../../styles.css";
import { GET } from "@/app/api/auth/getUserId/route";

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
  console.log(allEvents);
  let { data: allUsers } = await supabase.from("users").select();
  let { data: nextAuthUsers } = await supabaseNext.from("users").select();
  allEvents = allEvents || [];
  const slugEvent = allEvents.find((event: any) => event.id === eventId);

  const response = await GET();
  const user = await response.json();
  const userId = user[0].id;

  let similarityRes = await fetch("/api/comparison/supabase?user=" + userId);
  let similarity = await similarityRes.json();

  if (!slugEvent) {
    return <div>Slug doesn't correspond to an event, please try again</div>;
  } else {
    const UserList = () => (
      <ul>
        {slugEvent.participantids.map(async (partId: any) => {
          allUsers = allUsers || [];
          nextAuthUsers = nextAuthUsers || [];
          const findUser = allUsers.find((user: any) => user.id === partId);
          const findAuth = nextAuthUsers.find(
            (user: any) => user.id === partId
          );
          if (userId !== partId) {
            let userSimilarity = 0;
            for (let index = 0; index < similarity.length; index++) {
              const element = similarity[index];
              if (element.id === partId) {
                userSimilarity = element.similarity;
              }
            }
            return (
              <li key={partId}>
                <div>
                  <Image
                    src={findAuth.image}
                    width={100}
                    height={100}
                    alt={"profile-picture"}
                    className="bor w-50 h-50 ml-5 rounded-full"
                  />
                </div>
                <p>{findUser.username}</p>
                <p>Similarity: {userSimilarity}</p>
              </li>
            );
          }
          return null;
        })}
      </ul>
    );

    return (
      <div>
        <div className="flex justify-center items-center h-screen">
          <div className="h-screen items-center justify-center w-full max-w-xs">
            <h1 className="text-white body-font font-poppins text-7xl font-black mt-20 mb-5">
              friended.
            </h1>
            <form className="rounded px-8 pt-6 pb-8 mb-4">
              <div className=" flex relative w-500px h-48px group justify-center items-center z-1001 ">
                <h1 className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                  Event Name: <strong id="eventName">{slugEvent.name}</strong>
                </h1>
              </div>
              <div
                id="info"
                className="flex relative w-500px h-48px group justify-center items-center z-1001 "
              >
                <h1 className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mt-5">
                  Description:{" "}
                  <strong id="eventName">{slugEvent.description}</strong>
                </h1>
              </div>
              <h3 id="userMessage">Users:</h3>
              <div id="users">
                <UserList />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

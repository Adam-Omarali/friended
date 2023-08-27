import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Events } from "./update/Events"
import Image from 'next/image';
import profile from '../img/profile.png';
import "./spaces.css";

interface Space {
  id: string;
  name: string;
  description: string;
  public: boolean;
  organizationid: string;
  participantids: string[];
  password: string;
}

export async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const { data: spaces} = await supabase.from("events").select();
  const { data: organizations} = await supabase.from("organizations").select("name")

  return (
    <body className="body">
      <div className="container">
        <div className="profile-image">
          <Image src={profile} alt="Profile Picture" width={75} height={75} />
        </div>
        <h1 className="product-name">friended.</h1>
        <h2 className="events">Events</h2>
        </div>
        <Events spaces={{spaceInfo:spaces, organizationInfo: organizations}}/>
    </body>
  );
}

export default Page;

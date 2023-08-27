import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Events } from "./update/Events";
import Image from "next/image";
import Link from "next/link";
import profile from "../img/profile.png";
import {GET} from "../api/auth/getUserId/route";
import React from 'react';
import "./spaces.css";

interface space {
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
  const { data: spaces } = await supabase.from("events").select();
  const { data: organizations } = await supabase.from("organizations").select();
  const { data: userInfo } = await supabase.from("users").select();
  const response = await GET();
  const dataRes = await response.json();
  console.log(dataRes);
  return (
      <body className="body">
        <div className="container">
          <div className="profile-image">
            <Image src={profile} alt="Profile Picture" width={75} height={75} />
          </div>
          <h1 className="product-name">friended.</h1>
          <h2 className="events">Events</h2>
        </div>
        <Events
          spaces={{
            spaceInfo: spaces,
            organizationInfo: organizations,
            userInfo: userInfo,
            newUserId: dataRes.length>0? dataRes[0].id : ""
          }}
        />
        <Link href={`/spaces/create`}>
          Go to create
        </Link>
      </body>
  );
}

export default Page;

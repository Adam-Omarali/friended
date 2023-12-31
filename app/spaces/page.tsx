import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Events } from "./update/Events";
import Link from "next/link";
import { GET } from "../api/auth/getUserId/route";
import React from "react";
import "../styles.css";

interface space {
  id: string;
  name: string;
  description: string;
  public: boolean;
  organizationid: string;
  participantids: string[];
  password: string;
}

export default async function Space() {
  const supabase = createServerComponentClient({ cookies });
  const { data: spaces } = await supabase.from("events").select();
  const { data: organizations } = await supabase.from("organizations").select();
  const { data: userInfo } = await supabase.from("users").select();
  const response = await GET();
  const dataRes = await response.json();
  //console.log(dataRes);
  return (
    <div className="w-full flex-center min-h-screen mb-10">
      <div className="">
        <h1 className="text-white body-font font-poppins text-5xl font-black top-7 mb-5 absolute left-0 top-0 w-16 h-16 ml-10">
          friended.
        </h1>
        <div
          id="topRightProfile"
          className="flex absolute top-5  w-16 h-16 ml-10"
        >
          <button
            id="customButton"
            className=" text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight"
          >
            <Link href="/profile">profile.</Link>
          </button>
          <img
            className=" w-50 h-50 ml-5 rounded-full "
            src="https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg"
            alt="Rounded avatar"
          ></img>
        </div>
      </div>
      <Events
        spaces={{
          spaceInfo: spaces,
          organizationInfo: organizations,
          userInfo: userInfo,
          newUserId: dataRes[0].id,
          UserEvent: dataRes[0].events,
        }}
      />
    </div>
  );
}

// import React from "react";

// export default function Page({ params, searchParams }) {
//   return <div>ID: {params.id}</div>;
// }

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import "../../styles.css";
// import { GET } from "../api/auth/getUserId/route";
import { GET } from "../../api/auth/getUserId/route";
import { useState } from "react";
export const dynamic = "force-dynamic";

import { BsLinkedin } from "react-icons/bs";
import { SiDevpost } from "react-icons/si";

export default async function View({ params, searchParams }: any) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const { data: any } = await supabase
  //   .from("users")
  //   .select()
  //   .eq("id", params.id);

  const response = await GET();
  const dataRes = await response.json();
  console.log(dataRes);

  return (
    <body className="">
      <div className="">
        <h1 className="text-white body-font font-poppins text-5xl font-black top-7 mb-5 absolute left-0 top-0 w-16 h-16 ml-10">
          friended.
        </h1>
        <div id="topRight" className="flex absolute top-5  w-16 h-16 ml-10">
          <button
            id="customButton"
            className=" text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight"
          >
            <Link href="/spaces">spaces.</Link>
          </button>
          <button
            id="customButton"
            className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  ml-5  py-2 px-3 leading-tight"
          >
            <Link href="/profile">profile.</Link>
          </button>
          <button
            id="customButton"
            className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  ml-5  py-2 px-3 leading-tight"
          >
            <Link href="/correlation">connect.</Link>
          </button>
          <img
            className=" w-50 h-50 ml-5 rounded-full "
            src="https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg"
            alt="Rounded avatar"
          ></img>
        </div>
      </div>
      <div className="flex w-4/5 px-4 h-screen font-poppins justify-between items-center">
        <div className="p-8 bg-peach rounded-3xl w-full">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">skills.</h3>
            {dataRes[0].skills.slice(0, 100) + "..."}
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">interests.</h3>
            {dataRes[0].interests}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">experience.</h3>
            {dataRes[0].experiences.slice(0, 100) + "..."}
          </div>
        </div>

        <div id="profileCard" className="flex justify-end items-center p-8">
          <div className="flex flex-col items-center">
            <img
              src="https://www.pngall.com/wp-content/uploads/12/Avatar-No-Background.png"
              alt="Profile"
              className="w-40 h-40 rounded-full mb-2"
            />
            <h1 className="text-4xl text-peach  font-poppins font-black">
              {dataRes[0].username}
            </h1>

            {/* <button
              id="customButton"
              className=" text-lightpink font-black text-2xl font-poppins bg-white rounded-2xl py-2 px-3 leading-tight mt-5"
            >
              copy email.
            </button> */}
            <div className="flex w-full justify-evenly mt-3">
              <Link href={dataRes[0].linkedin} target="_blank">
                <BsLinkedin className="text-4xl text-blue-500" />
              </Link>
              <Link href={dataRes[0].devpost} target="_blank">
                <SiDevpost className="text-4xl text-green-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

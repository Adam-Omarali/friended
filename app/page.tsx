// index.js or Index.jsx
"use client";

import Image from "next/image";
import landingImg from "./img/landingPage.png";
import "./styles.css"; // Import your styles
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

export const dynamic = "force-dynamic";
export default function Index() {
  // if (session) {
  //   return <div>{session.user?.name}</div>;
  // }
  return (
    <div className="w-full flex min-h-screen items-center justify-center">
      <div className="ml-[10vw]">
        <h1 className="product-name">friended.</h1>
        <h2 className="product-description">
          Connect with hackers <br />
          and fellow enthusiasts.
        </h2>
        <Button
          id="customButton"
          className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight mt-5"
          onClick={() => signIn("google")}
        >
          login with google.
        </Button>
      </div>
      <Image src={landingImg} alt="Image" />
    </div>
  );
}

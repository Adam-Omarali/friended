// index.js or Index.jsx
"use client";

import Image from "next/image";
import landingImg from "./img/landingPage.png";
import "./styles.css"; // Import your styles
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

export const dynamic = "force-dynamic";
export default function Index() {
  const { data: session } = useSession();
  // if (session) {
  //   return <div>{session.user?.name}</div>;
  // }
  return (
    <div className="w-full min-h-screen flex items-center justify-evenly">
      <div className="ml-[10vw]">
        <h1 className="product-name">friended.</h1>
        <h2 className="product-description">Connect with hackers.</h2>
        <h2 className="product-description">Meet Intellectuals.</h2>
        <h2 className="product-description">Find the friends you</h2>
        <h2 className="product-description">never knew you had.</h2>
        <Button
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

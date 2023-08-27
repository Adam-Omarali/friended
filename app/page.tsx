// index.js or Index.jsx
"use client";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
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
    <div>
      {/* Rest of your component */}
      <body className="w-full flex-center min-h-screen">
        <div className="flex-center">
          <div className="ml-[10vw]">
            <h1 className="product-name">friended.</h1>
            <h2 className="product-description">
              Connect with hackers <br />
              and fellow enthusiasts.
            </h2>
            <Button onClick={() => signIn("google")}>login with google.</Button>
          </div>
          <Image
            src={landingImg}
            alt="Image"
            className="landing-image"
          />
        </div>
      </body>
    </div>
  );
}

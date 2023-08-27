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
            //width={700}
            //height={700}
            className="landing-image"
          />
        </div>
      </body>
    </div>
  );
}

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import profile from "../img/profile.png";
import link from "../img/Link.png";
import CorrelationComponent from "./correlationComponent";
import "./correlation.css";
import "../styles.css";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <CorrelationComponent />;
}

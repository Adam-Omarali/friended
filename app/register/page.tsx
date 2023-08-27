import RegisterComponent from "./registerComponent";

import "../styles.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";

export default async function Register({
  searchParams,
}: {
  searchParams: { uid: string; name: string };
}) {
  return <RegisterComponent id={searchParams.uid} name={searchParams.name} />;
}

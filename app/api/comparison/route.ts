import { dotproduct } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";


export async function POST(request: Request){
    // let user1 = "8f33ad9e-9ac1-45ac-a1b3-c1991ce7e376"
    // let user2 = "84072f71-2c75-4f53-a933-80ee2c968c70"

    let {user1, user2} = await request.json()

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!)

    let {data: vec1, error: e1} = await supabase.from("users").select("embedding").eq("id", user1)
    let {data: vec2, error: e2} = await supabase.from("users").select("embedding").eq("id", user2)

    if(vec1 && vec2){
        let res1 = JSON.parse(vec1[0].embedding)
        let res2 = JSON.parse(vec2[0].embedding)
        return NextResponse.json({similarity: dotproduct(res1, res2)})
    }

    return NextResponse.error()

}
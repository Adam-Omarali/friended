import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(request: Request){
    const supabase = createServerComponentClient({ cookies });

    let {username, organization, linkedin, devpost, id} = await request.json()
    console.log(id)

    let {data, error} = await supabase.from("users").insert([
        { id, username, friends: [], events: [], organization: organization, linkedin, devpost },
    ])

    if(error){
        console.log(error)
        return NextResponse.error()
    }

    return NextResponse.json(data)


}
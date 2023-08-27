import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = createServerComponentClient({ cookies });

    let {name, description, publicSpace, password} = await request.json()

    let organizationId = "8968ab43-1ed5-405d-b11e-18ede3a80ba2"
    
    const { data, error } = await supabase
    .from('events')
    .insert([
    { name: name, description: description, organizationid: organizationId, public: publicSpace, password: password },
    ])
    .select()

    if(error){
        return NextResponse.error()
    }

    return NextResponse.json(data)
}
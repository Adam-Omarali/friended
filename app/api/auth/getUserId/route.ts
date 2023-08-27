import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(){
    const session = await getServerSession(authOptions)
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
        db: {
            schema: 'next_auth'
        }
    })

    const {data, error} = await supabase.from("users").select('id').eq('email', session?.user?.email)
    if(data && data.length > 0){
        console.log(data[0].id)
        return NextResponse.json(data[0].id)
        
    }
    return NextResponse.error()

}
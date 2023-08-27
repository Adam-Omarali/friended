import { NextResponse } from 'next/server'
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {

    const openAiAPIKey = process.env.OPENAI_API_KEY
    const { searchParams } = new URL(request.url)
    const searchQuery = searchParams.get('user');
    console.log(searchQuery)

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!)

    let {data: userEmbedding} = await supabase.from("users").select("embedding").eq("id", searchQuery)

    if(userEmbedding){
        userEmbedding = userEmbedding[0].embedding

        const { data } = await supabase.rpc('match_users', {
            query_embedding: userEmbedding,
            match_threshold: 0.2,
            match_count: 30,
        })
        
        return NextResponse.json(data)

        

    }




    // if (searchQuery) {
    //     return NextResponse.json(data)

    // }
    return NextResponse.json({hi: "hi"})
}
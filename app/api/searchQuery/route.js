
// export async function GET(req, res) {
//     const openAiAPIKey = "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"

//     const queryName = req.nextUrl.searchParams.get([query])
//     console.log("**************************************")
//     console.log("**************************************")
//     console.log("**************************************")
//     console.log(queryName)
//     console.log("**************************************")
//     console.log("**************************************")
//     console.log("**************************************")
//     return;

//     const response = await fetch("https://api.openai.com/v1/embeddings", {
//         method: "POST",
//         headers: {
//             'Content-Type': "application/json",
//             Authorization: `Bearer ${openAiAPIKey}`
//         }, body: JSON.stringify({
//             input: query, model: 'text-embeddings-ada-002'
//         })
//     })

//     const responseData = await response.json();
//     const embedding = responseData.data[0].embedding;

//     const { data } = await SupabaseAdapter.rpc('match_users', {
//         query_embedding: embedding,
//         similarity_threshold: 0.78,
//         match_count: 10,
//     })

//     console.log(data)
//     try {

//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: "Internal server error" });
//     }

// }


import { NextResponse } from 'next/server'
import { createClient } from "@supabase/supabase-js";

export async function GET(request) {

    const openAiAPIKey = "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"
    const { searchParams } = new URL(request.url)
    const searchQuery = searchParams.get('query');
    console.log(searchQuery)
    console.log("search auqyer baove")

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        db: {
            schema: 'public'
        }
    })

    const response = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${openAiAPIKey}`
        }, body: JSON.stringify({
            input: searchQuery, model: 'text-embedding-ada-002'
        })
    })

    const responseData = await response.json();


    const embedding = responseData.data[0].embedding;

    const { data } = await supabase.rpc('match_users', {
        query_embedding: embedding,
        match_threshold: 0.2,
        match_count: 30,
    })

    console.log(data)




    if (searchQuery) {
        return NextResponse.json(data)

    }
    return NextResponse.error()
}

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

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server'

export async function GET(request) {
    const supabase = createServerComponentClient({ cookies });
    const openAiAPIKey = "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"
    const { searchParams } = new URL(request.url)
    const searchQuery = searchParams.get('query');
    console.log(searchQuery)
    console.log("search auqyer baove")

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
        similarity_threshold: 0.2,
        match_count: 1,
    })

    console.log(data)




    if (searchQuery) {
        return NextResponse.json(searchQuery)

    }
    return NextResponse.error()
}
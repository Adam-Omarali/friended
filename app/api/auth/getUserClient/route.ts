import { createClient } from "@supabase/supabase-js";

export async function GETClient(){
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!, {
        db: {
            schema: 'next_auth'
        }
    })

    const supabasePublic = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!, {
        db: {
            schema: 'public'
        }
    })
    const { data: { user } } = await supabase.auth.getUser()
    if(user){
        const {data: dataPublic} = await supabasePublic.from("users").select().eq('id', user.id)
        return dataPublic    
    }
    return "Failed to get user"

}
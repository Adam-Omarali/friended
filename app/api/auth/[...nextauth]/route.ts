import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";
import { User } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          })
    ],
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    }) as Adapter,
    callbacks: {
        async signIn({ user }: {user: User}){
            let firstSignIn = false
            const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

            let {data: users} = await supabase.from("users").select().eq("id", user.id)
            firstSignIn = users?.length == 0
            if(firstSignIn){
                console.log('signing in')
                return '/register?uid=' + user.id + '&name=' + user.name
            }

            return true
        }
    }
}

const handler = NextAuth({providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      })
    ],
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    }) as Adapter,
    callbacks: {
        async signIn({ user }: {user: User}){
            let firstSignIn = false
            const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

            let {data: users} = await supabase.from("users").select().eq("id", user.id)
            firstSignIn = users?.length == 0

            if(firstSignIn){
                console.log('signing in')
                return '/register?uid=' + user.id + '&name=' + user.name
            }

            return true
        }
}})

export {handler as GET, handler as POST}
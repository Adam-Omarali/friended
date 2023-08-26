// index.js or Index.jsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image';
import "./correlation.css";

export const dynamic = 'force-dynamic'
export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div>
      {/* Rest of your component */}
      <body className="w-full flex-center min-h-screen">
        <div className="flex-center">
          <h1 className = "product-name">friended.</h1>
          <Link href="/" className="profile-link">
            your profile.
          </Link>
        </div>
      </body>
    </div>
  )
}

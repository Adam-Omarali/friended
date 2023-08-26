// index.js or Index.jsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import './styles.css';

export const dynamic = 'force-dynamic'
export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <body className="w-full flex-center min-h-screen">
      <div className="flex-center">
        <Link href="/login" className="login-link">
          Login
        </Link>
      </div>
    </body>
  )
}

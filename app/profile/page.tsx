import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link';
import ProfileComponent from './profileComponent'
import '../styles.css';

export const dynamic = 'force-dynamic'

export default async function View() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <ProfileComponent />
  )
}

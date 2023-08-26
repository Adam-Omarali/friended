import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image';
import landingImg from './img/landingPage.png'
import './styles.css'; // Import your styles

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
          <h2 className = "product-description">
          Connect with hackers <br />
          and fellow enthusiasts.
          </h2>
          <Link href="/login" className="login-link">
            login with google.
          </Link>
          <Image
              src={landingImg} 
              alt="Image"
              //width={700}
              //height={700}
              className="landing-image"
          />
        </div>
      </body>
    </div>
  )
}
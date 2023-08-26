import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import '../styles.css';

export const dynamic = 'force-dynamic'

export default async function Register() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <body className="w-full flex-center min-h-screen">
      <div className="h-screen items-center justify-center w-full max-w-xs">
        <h1 className="text-white body-font font-poppins text-7xl font-black mt-20 mb-5" >friended.</h1>
        <form className="rounded px-8 pt-6 pb-8 mb-4">
        <div className=" flex relative w-500px h-48px group justify-center items-center z-1001 ">
            <input className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="your LinkedIn."/>
            <span className="flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2">
              <img  src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedinlogo" width={25} height={25}/>
            </span>
        </div>
        <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
            <input className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="your DevPost."/>
            <span className="flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2">
              <img  src="https://seeklogo.com/images/D/devpost-logo-95FF685C5D-seeklogo.com.png" alt="linkedinlogo" width={25} height={25}/>
            </span>
        </div>
        <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-2xl cursor-pointer" htmlFor="file_input" >select pfp.</label>
            <input className="hidden drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="file_input" type="file" placeholder="select pfp"/>
        </div>
        <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
          <button className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight">connect.</button>
        </div>
        </form>
      </div>
    </body>
  )
}

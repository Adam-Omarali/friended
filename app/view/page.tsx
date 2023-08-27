import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import '../styles.css';

export const dynamic = 'force-dynamic'

export default async function View() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <body className="">
      <div className="">
        <h1 className="text-white body-font font-poppins text-5xl font-black top-7 mb-5 absolute left-0 top-0 w-16 h-16 ml-10" >friended.</h1>
        <div id="topRight" className="flex absolute top-5  w-16 h-16 ml-10">
          <button className=" text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight"><Link href="/spaces">connect.</Link></button>
          <button  className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  ml-5  py-2 px-3 leading-tight"><Link href="/profile">profile</Link></button>
          <img className=" w-50 h-50 ml-5 rounded-full " src="https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg" alt="Rounded avatar"></img>
        </div>
      </div>
      <div className="flex h-screen font-poppins justify-center items-center">
      
        <div className="p-8 bg-peach rounded-3xl " >
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">skills.</h3>
            <ul className="list-disc list-inside">
              <li>JavaScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">interests.</h3>
            <ul className="list-disc list-inside">
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Machine Learning</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">experience.</h3>
            <p>Frontend Developer at Ignition (3 years)</p>
            <p>Software Engineer at Ignition (2 years)</p>
          </div>
        </div>

        
        <div id="profileCard" className="flex justify-end items-center p-8">
          <div className="flex flex-col items-center">
            <img
              src="https://www.pngall.com/wp-content/uploads/12/Avatar-No-Background.png"
              alt="Profile"
              className="w-40 h-40 rounded-full mb-2"
            />
            <h1 className="text-4xl text-peach  font-poppins font-black">First Name</h1>
            <p className="text-peach text-2xl font-poppins font-semibold">Last Name</p>
            <p id="matchPercent" className="text-5xl font-black mt-5 text-white">65%</p>
            <button className=" text-lightpink font-black text-2xl font-poppins bg-white rounded-2xl py-2 px-3 leading-tight mt-5">
              copy email.
            </button>
          </div>
        </div>
    </div>
      
    </body>
  )
}

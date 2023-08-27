import Link from 'next/link';
import Messages from './messages';
import './login.css'; // Import the new CSS file
import '../styles.css';

export default function Login() {
  return (
    <body  className="flex justify-center items-center h-screen">
          <div className="h-screen items-center justify-center w-full max-w-xs">
            <h1 className="text-white body-font font-poppins text-7xl font-black mt-20 mb-5" >friended.</h1>
            <form className="rounded px-8 pt-6 pb-8 mb-4">
            <div className=" flex relative w-500px h-48px group justify-center items-center z-1001 ">
                <input className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="your email."/>
                <span className="flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2">
                  <img  src="https://assets.stickpng.com/thumbs/584856bce0bb315b0f7675ad.png" alt="linkedinlogo" width={25} height={25}/>
                </span>
            </div>  
            <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
                <input className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="your password."/>
                <span className="flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2">
                  <img  src="https://cdn-icons-png.flaticon.com/512/4091/4091030.png" alt="linkedinlogo" width={25} height={25}/>
                </span>
            </div>
            
            <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
              <button className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight"><Link href="/correlation">sign up.</Link></button>
            </div>
            <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
              <button className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight"><Link href="/correlation">sign in.</Link></button>
            </div>
            </form>
          </div>
        </body>
  )
}
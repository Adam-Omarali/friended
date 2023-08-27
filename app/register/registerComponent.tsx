"use client"

import React, { useState } from "react";
import Link from 'next/link';

const RegisterComponent = () => {
    const [socialChoice, setSocialChoice] = useState();
    const [socialChoiceMessage, setSocialChoiceMessage] = useState('select social.');
    const [iconChoice,setIconChoice] = useState('https://static.thenounproject.com/png/3012911-200.png');
    const [dropDisplay,setDropDisplay] = useState(false);

    const socialMediaOptions = [
        {
            name:"Instagram",
            icon:"https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png",
            placeholder:"enter ig handle."
        },
        {
            name:"Discord",
            icon:"https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png",
            placeholder:"enter discord handle."
        }
    ]

    function handleChoices(){
        setDropDisplay(true);
    }

    const handleSelection = (value: any) => {
        setIconChoice(value.icon);
        setSocialChoice(value.name);
        setDropDisplay(false);
        setSocialChoiceMessage(value.placeholder);
    }

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
                <input className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-sm font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="file_input" type="file" placeholder="select pfp"/>
            </div>
            <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
                <input className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder={socialChoiceMessage}/>
                <span className="cursor-pointer flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2" >
                  <img onClick = {handleChoices} src={iconChoice} alt="linkedinlogo" width={25} height={25}/>
                </span>
            </div>
            <div className=" relative w-500px h-48px group justify-center items-center z-1001 mt-7" id="resultsList">{dropDisplay ? (
                    socialMediaOptions.map((result, id)=>{
                        return <div id="searchResult" key={id} onClick={()=>{handleSelection(result)}}>
                          {result.name}
                        </div>  
                    })           

                ) : (<h1></h1>)}
            </div>
            <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
              <button className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight"><Link href="/spaces">connect.</Link></button>
            </div>
            </form>
          </div>
        </body>
      )
};

export default RegisterComponent;


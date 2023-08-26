"use client"

import React, { useState } from "react";
import Link from 'next/link';

const ProfileComponent = () => {

    const skills=['Javascript','React','Node.js','Tailwind CSS'];
  const interests=['Web Development','UI/UX Design','Blockchain','Data Science']
  const experiences=['Frontend Developer at Ignition (3 years)','Software Engineer at Ignition (2 years)'];
  
  return (
    <body className="">
      <div className="">
        <h1 className="text-white body-font font-poppins text-5xl font-black top-7 mb-5 absolute left-0 top-0 w-16 h-16 ml-10" >friended.</h1>
        <div id="topRightProfile" className="flex absolute top-5  w-16 h-16 ml-10">
          <button className=" text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight"><Link href="/correlation">connect.</Link></button>
          <img className=" w-50 h-50 ml-5 rounded-full " src="https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg" alt="Rounded avatar"></img>
        </div>
      </div>
      <div className="flex h-screen font-poppins justify-center items-center">
      
        <div className="p-8 bg-peach rounded-3xl " >
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">skills.</h3>
            <ul id="editable" contentEditable="true" className="list-disc list-inside bg-lightgray rounded-lg px-2 py-2">
              {skills.map((skill)=>(<li>{skill}</li>))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">interests.</h3>
            <ul contentEditable="true" className="list-disc list-inside bg-lightgray rounded-lg px-2 py-2">
            {interests.map((interest)=>(<li>{interest}</li>))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">experience.</h3>
            <ul contentEditable="true" className="list-disc list-inside bg-lightgray rounded-lg px-2 py-2">
            {experiences.map((experience)=>(<li>{experience}</li>))}
            </ul>
          </div>
        </div>
          <form className="rounded px-8 pt-6 pb-8 mb-4">
            <div className=" flex relative w-500px h-48px group justify-center items-center z-1001 ">
                <input className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-lg font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="www.linkedin.com/in/jonathanshan1"/>
                <span className="flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2">
                  <img  src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedinlogo" width={25} height={25}/>
                </span>
            </div>
            <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
                <input className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-kg font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="devpost.com/JonnyACCI"/>
                <span className="flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2">
                  <img  src="https://seeklogo.com/images/D/devpost-logo-95FF685C5D-seeklogo.com.png" alt="linkedinlogo" width={25} height={25}/>
                </span>
            </div>
            <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-2xl cursor-pointer" htmlFor="file_input" >change pfp.</label>
                <input className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-sm font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="file_input" type="file" placeholder="change pfp"/>
            </div>
            <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
              <button className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight">save.</button>
            </div>
          </form>

        
      </div>
      
    </body>
  )
};

export default ProfileComponent;


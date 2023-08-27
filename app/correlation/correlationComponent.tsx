"use client"

import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import profile from '../img/profile.png';
import link from "../img/Link.png";

const CorrelationComponent = () => {

    const [spaceChoice, setSpaceChoice] = useState();
    const [spaceChoiceMessage, setSpaceChoiceMessage] = useState('select space.');
    const [dropDisplay,setDropDisplay] = useState(false);

    const dataArray = [
        {
          firstName: "John",
          lastName: "Doe",
          percentage: 75
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          percentage: 90
        },
        {
          firstName: "Michael",
          lastName: "Johnson",
          percentage: 60
        },
      ];

    function handleChoices(){
        setDropDisplay(true);
    }

    const handleSelection = (value: any) => {
        setSpaceChoice(value.name);
        setDropDisplay(false);
        setSpaceChoiceMessage(value.name);
    }

    const spaceOptions = [
        {
            name:"Ignition Hacks",
        },
        {
            name:"Hack the North",
        },
        {
            name:"Hack the Valley",
        },
        {
            name:"Hack the 6ix",
        }
    ]
  

  return (
    
      <body className="w-full flex-center min-h-screen">
        <div className="profile-image">
          <Image src={profile} alt="Profile Picture" width={75} height={75} />
        </div>
        <div className="">
            <h1 className="product-name">friended.</h1>
            <Link href="/" className="profile-link">
                profile.
            </Link>
            <Link href="/" className="connect-link">
                connect.
            </Link>
        <div>
            <div className="searchContainer">
                <input
                type="text"
                className="searchInput"
                placeholder="search for a name, skill, or interest."
                />
                <button className="searchButton">Search</button>
            </div>
            <div className="block">
                <div className="flex relative w-500px h-48px group ">
                    <input className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder={spaceChoiceMessage}/>
                    <span className="cursor-pointer flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2" >
                    <img onClick = {handleChoices} src='https://static.thenounproject.com/png/3012911-200.png' alt="linkedinlogo" width={25} height={25}/>
                    </span>
                </div>
                <div className="w-500px h-48px group" id="resultsList">{dropDisplay ? (
                        spaceOptions.map((result, id)=>{
                            return <div id="searchResult" key={id} onClick={()=>{handleSelection(result)}}>
                            {result.name}
                            </div>  
                        })           

                    ) : (<h1></h1>)}
                </div>
            </div>
            <h2 className="description">currently showing those most similar to you.</h2>
        </div>
        
        <div className="match-container">
        {dataArray.map((match, index) => (
            <div key={index} className="match">
                <div className="match-picture">
                    <Image src={profile} alt="Match Profile Picture" width={200} height={200} />
                </div>
                <Link href="/">
                    <Image src={link} alt="Match Link Icon" className="match-link-icon"/>
                </Link>
                <div className="match-info">
                    <p className="match-name">{match.firstName}<br/>{match.lastName}</p>
                    <p className="match-percentage">{match.percentage}%</p>
                </div>
            </div>
        ))}

          </div>
        </div>
      </body>
   
  )
};

export default CorrelationComponent;


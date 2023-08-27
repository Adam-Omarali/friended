"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import profile from "../img/profile.png";
import link from "../img/arrows.png";

const CorrelationComponent = () => {
  const dataArray = [
    {
      firstName: "John",
      lastName: "Doe",
      percentage: 75,
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      percentage: 90,
    },
    {
      firstName: "Michael",
      lastName: "Johnson",
      percentage: 60,
    },
  ];

  const [spaceChoice, setSpaceChoice] = useState("select space.");
  const [dropDisplay, setDropDisplay] = useState(false);
  const [searchRequest, setSearchRequest] = useState("");
  const [people, setPeople] = useState(dataArray); //set to empty array for real

  const [data, setData] = useState([]);

  function handleChoices() {
    setDropDisplay(true);
    setSpaceChoice("select space.");
  }

  const handleSelection = (value: any) => {
    setSpaceChoice(value.name);
    setDropDisplay(false);
  };

  const spaceOptions = [
    {
      name: "Ignition Hacks",
    },
    {
      name: "Hack the North",
    },
    {
      name: "Hack the Valley",
    },
    {
      name: "Hack the 6ix",
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!searchRequest) return;

    const response = await fetch(
      `/api/searchQuery?query=${encodeURIComponent(searchRequest)}`
    );

    const resdata = await response.json();
    console.log(resdata);
    setData(resdata);
  };

  return (
    <body className="w-full  min-h-screen">
      <div className="">
        <h1 className="text-white body-font font-poppins text-5xl font-black top-7 mb-5 absolute left-0 top-0 w-16 h-16 ml-10">
          friended.
        </h1>
        <div
          id="topRightCorrelation"
          className="flex absolute top-5  w-16 h-16 ml-10"
        >
          <button
            id="customButton"
            className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight"
          >
            <Link href="/spaces">spaces.</Link>
          </button>
          <button
            id="customButton"
            className=" text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl  ml-5  py-2 px-3 leading-tight"
          >
            <Link href="/profile">profile</Link>
          </button>
          <img
            className=" w-50 h-50 ml-5 rounded-full "
            src="https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg"
            alt="Rounded avatar"
          ></img>
        </div>
      </div>
      <div
        className="flex relative w-500px h-48px group justify-center  mt-7"
        id="spaceSearch"
      >
        <input
          className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder={spaceChoice}
        />
        <span className="cursor-pointer flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2">
          <img
            onClick={handleChoices}
            src="https://static.thenounproject.com/png/3012911-200.png"
            alt="linkedinlogo"
            width={25}
            height={25}
          />
        </span>
      </div>
      <div
        className=" relative  h-48px group justify-center  mt-7"
        id="searchList"
      >
        {dropDisplay ? (
          spaceOptions.map((result, id) => {
            return (
              <div
                id="searchResult"
                key={id}
                onClick={() => {
                  handleSelection(result);
                }}
              >
                {result.name}
              </div>
            );
          })
        ) : (
          <h1></h1>
        )}
      </div>
      {spaceChoice === "select space." ? (
        <h1></h1>
      ) : (
        <div className="justify-center">
          <div className="searchContainer">
            <input
              type="text"
              className="searchInput"
              placeholder="search for a name, skill, or interest."
              onChange={(e) => {
                setSearchRequest(e.target.value);
              }}
            />
            <button onClick={(e) => handleSubmit(e)} className="searchButton">
              Search
            </button>
          </div>

          {searchRequest === "" ? (
            <h2 className="description text-center">
              search for ai-reccommended profiles.
            </h2>
          ) : (
            <h2 className="altdescription text-center">
              displaying search results.
            </h2>
          )}

          <div className="match-container ">
            {data.length > 1 &&
              data.map((match: any) => (
                <div key={match.id} className="match relative">
                  <div className="match-picture">
                    <Image
                      src={profile}
                      alt="Match Profile Picture"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="absolute top-0 right-0 h-16 w-16  pt-11">
                    <Link href={`/view/${match.id}`}>
                      <Image
                        src={link}
                        alt="Match Link Icon"
                        className="match-link-icon"
                      />
                    </Link>
                  </div>
                  <div className="match-info">
                    <p className="match-name">{match.username}</p>
                    <p className="match-percentage">
                      {match.similarity
                        ? match.similarity.toFixed(2) * 100
                        : ""}
                      % match.
                    </p>
                    <div className="w-3/4 hidden">
                      <p className="truncate font-medium">{match.devpost}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* {searchRequest === "" ? (
            <h2 className="description">
              Search to find AI-suggested profiles.
            </h2>
          ) : (
            <h2 className="description">Displaying search results.</h2>
          )} */}

          {/* <div className="match-container ">
            {data.map((match: any) => (
              <div key={match.id} className="match relative">
                <div className="match-picture">
                  <Image
                    src={profile}
                    alt="Match Profile Picture"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="absolute top-0 right-0 h-16 w-16  pt-11">
                  <Link href={`/view/${match.id}`}>
                    <Image
                      src={link}
                      alt="Match Link Icon"
                      className="match-link-icon"
                    />
                  </Link>
                </div>
                <div className="match-info">
                  <p className="match-name">{match.username}</p>
                  <p className="match-percentage">
                    {match.similarity ? match.similarity.toFixed(2) * 100 : ""}%
                    Match
                  </p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      )}
    </body>
  );
};

export default CorrelationComponent;

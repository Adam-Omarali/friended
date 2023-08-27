"use client";
import React, { useState, useEffect } from "react";
import { AddUserButton } from "./AddUserButton";

interface SpaceProps {
  spaces: any;
}

export function Events({ spaces }: SpaceProps) {
  const spaceInfo = spaces.spaceInfo;
  const organizationInfo = spaces.organizationInfo;
  const newUserId = spaces.newUserId;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSpaces, setFilteredSpaces] = useState(spaceInfo);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSpaces(spaceInfo);
    } else {
      const filtered = spaceInfo.filter((space: any) =>
        space.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSpaces(filtered);
    }
  }, [searchQuery, spaceInfo]);

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="searchContainer">
<<<<<<< HEAD
          <input
=======
            <input
>>>>>>> Jonathan
            type="text"
            className="searchInput"
            placeholder="search by event name."
            onChange={(e) => setSearchQuery(e.target.value)}
<<<<<<< HEAD
          />
          <button className="searchButton">Search</button>
        </div>
=======
            />
            <button className="searchButton">Search</button>
        </div>  
>>>>>>> Jonathan
      </div>
      <div className="space-container ">
        {filteredSpaces?.map((space: any) => {
          const organizer = organizationInfo.find(
            (org: any) => org.id == space.organizationid
          );
          return (
            <div className="space relative" key={space.id}>
              <h1 className="space-name">{space.name}</h1>
              <p className="text-2xl">
                <p className="participants mb-5">
                  {space.participantids ? space.participantids.length : 0}{" "}
                </p>
                Participants
              </p>
              <p className="space-description">{space.description} </p>
<<<<<<< HEAD
              <p className="public">
                {space.public === true ? "Public Event" : "Private Event"}
              </p>
=======
              <p className="public">{space.public===true?"Public Event":"Private Event"}</p>
>>>>>>> Jonathan
              <p className="organizer">
                Organized by{" "}
                <strong id="organizerName">
                  {organizer ? organizer.name : ""}
                </strong>
              </p>
              <AddUserButton
                eventId={{
                  id: space.id,
                  participant: space.participantids,
                  public: space.public,
                  password: space.password,
<<<<<<< HEAD
                  newParticipant: newUserId,
=======
                  // newParticipant: participantMock,
>>>>>>> Jonathan
                }}
              />
            </div>
          );
        })}

        {/* {filteredSpaces?.map((space: any) => {
          const organizer = organizationInfo.find(
              (org: any) => org.id== space.organizationid
            );
          return (
            <div className="space-container" key={space.id}>
                <div className="header">
                  <h1 className="space-name">{space.name}</h1>
                  <p className="participants">
                    {space.participantids ? space.participantids.length : 0}{" "}
                    Participants
                  </p>
                  <p className="public">{space.public===true?"Public Event":"Private Event"}</p>
                  <p className="organizer">
                    Organized by {organizer ? organizer.name: ""}
                  </p>
                </div>
                <p className="space-description">{space.description}</p>
                <AddUserButton
                  eventId={{
                    id: space.id,
                    participant: space.participantids,
                    public: space.public,
                    password: space.password,
                    newParticipant: newUserId
                  }}
                />
              </div>
          );
        })} */}
      </div>
      {/* <div className="flex-container">
        {filteredSpaces?.map((space: any) => {
          const organizer = organizationInfo.find(
            (org: any) => org.id == space.organizationid
          );
          return (
            <div className="space-container" key={space.id}>
              <div className="header">
                <h1 className="space-name">{space.name}</h1>
                <p className="participants">
                  {space.participantids ? space.participantids.length : 0}{" "}
                  Participants
                </p>
                <p className="public">
                  {space.public === true ? "Public Event" : "Private Event"}
                </p>
                <p className="organizer">
                  Organized by {organizer ? organizer.name : ""}
                </p>
              </div>
              <p className="space-description">{space.description}</p>
              <AddUserButton
                eventId={{
                  id: space.id,
                  participant: space.participantids,
                  public: space.public,
                  password: space.password,
                  newParticipant: participantMock,
                }}
              />
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

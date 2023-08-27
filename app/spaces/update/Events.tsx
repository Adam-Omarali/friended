"use client";
import React, { useState, useEffect } from "react";
import { AddUserButton } from "./AddUserButton";

interface SpaceProps {
  spaces: any;
}

export function Events({ spaces }: SpaceProps) {
  const spaceInfo = spaces.spaceInfo;
  const organizationInfo = spaces.organizationInfo;
  const userInfo = spaces.userInfo;
  const newUserId = spaces.newUserId;
  const curEvents = spaces.UserEvent;
  //console.log(userInfo);
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

    console.log();
  }, [searchQuery, spaceInfo]);

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="searchContainer">
          <input
            type="text"
            className="searchInput"
            placeholder="search by event name."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="searchButton">Search</button>
        </div>
      </div>
      <div className="space-container">
        {filteredSpaces?.map((space: any) => {
          const organizer = organizationInfo.find(
            (org: any) => org.id == space.organizationid
          );
          return (
            <div className="space relative" key={space.id}>
              <h1 className="space-name">{space.name}</h1>
              <p className="participants mb-5">
                {space.participantids ? space.participantids.length : 0}{" "}
                Participants
              </p>
              <p className="space-description">{space.description} </p>
              <p className="public">
                {space.public === true ? "Public Event" : "Private Event"}
              </p>
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
                  userEvents: curEvents,
                  password: space.password,
                  newParticipant: newUserId,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

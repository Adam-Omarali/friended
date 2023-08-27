"use client"
import React, { useState, useEffect } from 'react';
import "../spaces.css";
import { AddUserButton } from "./AddUserButton";

interface SpaceProps {
  spaces: any;
}

export function Events({spaces}: SpaceProps) {
  const spaceInfo = spaces.spaceInfo;
  const organizationInfo = spaces.organizationInfo;
  const participantMock = "test";

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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by event name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex-container">
        {filteredSpaces?.map((space: any) => {
          const organizer = organizationInfo.find(
            (org: any) => org.id === space.organizationid
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
                    Organized by {organizer ? organizer[0].name : ""}
                  </p>
                </div>
                <p className="space-description">{space.description}</p>
                <AddUserButton
                  eventId={{
                    id: space.id,
                    participant: space.participantids,
                    public: space.public,
                    password: space.password,
                    newParticipant: participantMock
                  }}
                />
              </div>
          );
        })}
      </div>
    </div>
  );
}
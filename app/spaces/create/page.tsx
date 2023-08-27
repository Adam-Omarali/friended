"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import ToggleSwitch from "./switch";
import "../../styles.css";
import { GETClient } from "../../api/auth/getUserClient/route";
import Link from "next/link";

function CreateSpaceForm() {
  const [spaceName, setSpaceName] = useState("");
  const [description, setDescription] = useState("");
  const [publicSpace, setPublicSpace] = useState(true);
  const [password, setPassword] = useState("");
  const [dropDisplay, setDropDisplay] = useState(false);
  const [spaceChoice, setSpaceChoice] = useState("");
  const [spaceChoiceMessage, setSpaceChoiceMessage] = useState("space type");

  async function addSpace() {
    await fetch("/spaces/create/api", {
      method: "POST",
      body: JSON.stringify({
        name: spaceName,
        description: description,
        publicSpace: publicSpace,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const spaceOptions = [
    {
      name: "public",
      displayName: "public.",
    },
    {
      name: "private",
      displayName: "private.",
    },
  ];

  function handleChoices() {
    console.log("ic");
    if (publicSpace) {
      setPublicSpace(false);
      setSpaceChoice("private");
      console.log("private");
    } else {
      setPublicSpace(true);
      setSpaceChoice("public");
      console.log("public");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-screen items-center justify-center w-full max-w-xs">
        <h1 className="text-white body-font font-poppins text-7xl font-black mt-20 mb-5">
          friended.
        </h1>
        <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-1 mb-5">
          <input
            className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="space name."
            onChange={(e) => setSpaceName(e.currentTarget.value)}
          />
        </div>
        <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-1 mb-5">
          <input
            className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="description."
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>
        <div className="container">
          <strong id="privateText">{"Private"}</strong>
          {"  "}
          <div className="toggle-switch">
            <input
              onClick={() => {
                handleChoices();
              }}
              type="checkbox"
              className="checkbox"
              name={"Private"}
              id={"Private"}
            />
            <label className="label" htmlFor={"Private"}>
              <span className="inner" />
              <span className="switch" />
            </label>
          </div>
        </div>
        {spaceChoice === "private" ? (
          <div>
            <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-3">
              <input
                onChange={(e) => setPassword(e.currentTarget.value)}
                className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="space password."
              />
              <span className="flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4091/4091030.png"
                  alt="linkedinlogo"
                  width={25}
                  height={25}
                />
              </span>
            </div>
          </div>
        ) : (
          <h1></h1>
        )}

        <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
          <button
            id="customButton"
            className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl py-2 px-3 leading-tight"
            onClick={async () => await addSpace()}
          >
            <Link href="/spaces">create.</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSpaceForm;

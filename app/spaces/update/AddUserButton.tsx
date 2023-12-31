"use client";
import { Button } from "@/components/ui/button";
import { getSession, useSession } from "next-auth/react";
import { useReducer, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface AddUserButtonProps {
  eventId: any;
}

export function AddUserButton({ eventId }: AddUserButtonProps) {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDuplicateParticipant, setIsDuplicateParticipant] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const existingParticipant = eventId.participant;
  const newParticipant = eventId.newParticipant;
  const existingEvents = eventId.userEvents;
  const spacePassword = eventId.password;
  const isPublic = eventId.public;
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setIsValid(newValue === spacePassword);
  };

  const addUser = async (newParticipant: any) => {
    setIsFail(false);
    setIsSuccess(false);
    setIsDuplicateParticipant(false);
    if (!isPublic && !isValid) {
      setIsFail(true);
      setIsSuccess(false);
      setIsDuplicateParticipant(false);
      return;
    }

    if (existingParticipant.includes(newParticipant)) {
      setIsFail(false);
      setIsSuccess(false);
      setIsDuplicateParticipant(true);
      return;
    }

    const response = await fetch("/spaces/update/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        existingParticipant,
        newParticipant,
        existingEvents,
      }),
    });

    setInputValue("");
    const data = await response.json();
    setIsSuccess(true);
    setIsFail(false);
    setIsDuplicateParticipant(false); // Reset the duplicate participant state
    router.push("/spaces/" + eventId.id);
  };

  return (
    <div className="password-input">
      {!isPublic && (
        <div className="flex relative w-500px h-48px group justify-center items-center z-1001 mt-7">
          <input
            value={inputValue}
            onChange={handleInputChange}
            className="drop-shadow-2xl bg-lightgray placeholder-lightpurple text-xl font-bold shadow appearance-none border rounded-2xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="password"
            placeholder="password."
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
      )}

      {!existingParticipant.includes(newParticipant) ? (
        <Button
          className="text-lightpink font-black  text-3xl font-poppins bg-white rounded-2xl  py-2 px-3 leading-tight mt-5"
          onClick={() => addUser(newParticipant)}
        >
          Join Event
        </Button>
      ) : (
        <a
          href={`/spaces/${eventId.id}`} // Set the href for the anchor tag
          className="text-lightpink font-black text-3xl font-poppins bg-white rounded-2xl py-2 px-3 leading-tight mt-5"
        >
          View Event
        </a>
      )}
      {isFail && (
        <p className="error-message">Password incorrect, please try again!</p>
      )}
      {isSuccess && (
        <p className="success-message">You have been added to the space!</p>
      )}
      {isDuplicateParticipant && (
        <p className="error-message">
          Participant already exists in the space!
        </p>
      )}
    </div>
  );
}

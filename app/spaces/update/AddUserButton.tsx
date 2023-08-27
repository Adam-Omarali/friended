"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "../spaces.css";

interface AddUserButtonProps {
  eventId: any;
}

export function AddUserButton({eventId}: AddUserButtonProps) {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const existingParticipant = eventId.participant;
  const newParticipant = eventId.newParticipant;
  const spacePassword = eventId.password;
  const isPublic = eventId.public;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setIsValid(newValue === spacePassword);
  };

  const addUser = async (newParticipant:any) => {
    if(!isPublic && !isValid){
      setIsFail(true);
      setIsSuccess(false);
      return;
    }
    const response = await fetch('/spaces/update/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId, existingParticipant, newParticipant }),
    });
    setInputValue("")
    const data = await response.json();
    setIsSuccess(true);
    setIsFail(false);
    return data;
  };
  return (
    <div className="password-input">
      {!isPublic&&<input
        type="password"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter password"
      />}
      <button onClick={() => addUser(newParticipant)} className="join-button">Join Event</button>
      {isFail&&<p className="error-message">Password incorrect, please try again!</p>}
      {isSuccess&&<p className="success-message">You have been added to the space!</p>}
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import "../spaces.css";

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
  const spacePassword = eventId.password;
  const isPublic = eventId.public;

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
      return;
    }
  
    if (existingParticipant.includes(newParticipant)) {
      setIsFail(false);
      setIsSuccess(false);
      setIsDuplicateParticipant(true); // New state to handle duplicate participant message
      return;
    }
  
    const response = await fetch("/spaces/update/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId, existingParticipant, newParticipant }),
    });
  
    setInputValue("");
    const data = await response.json();
    
    if (data.success) {
      setIsSuccess(true);
      setIsFail(false);
      setIsDuplicateParticipant(false); 
    } else {
      setIsDuplicateParticipant(false); 
      setIsSuccess(false);
      setIsFail(true);
    }
    
    setIsDuplicateParticipant(false); // Reset the duplicate participant state
    return data;
  };
  
  return (
    <div className="password-input">
      {!isPublic && (
        <input
          type="password"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter password"
        />
      )}
      <Button onClick={()=>addUser(newParticipant)}>Join Event</Button>
      {isFail && (
        <p className="error-message">Password incorrect, please try again!</p>
      )}
      {isSuccess && (
        <p className="success-message">You have been added to the space!</p>
      )}
      {isDuplicateParticipant && (
        <p className="error-message">Participant already exists in the space!</p>
      )}
    </div>
  );
}

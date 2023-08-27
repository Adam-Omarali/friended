"use client"
import React, { useState } from "react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {GETClient} from '../../api/auth/getUserClient/route';

function CreateSpaceForm() {
  const [spaceName, setSpaceName] = useState("");
  const [description, setDescription] = useState("");
  const [publicSpace, setPublicSpace] = useState(false);
  const [password, setPassword] = useState("");
  
  async function addSpace() {
    const data = await GETClient();
    console.log(data);
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

  return (
    <div className="flex flex-col gap-4 p-4">
      <Input
        placeholder="Space Name"
        onChange={(e) => setSpaceName(e.currentTarget.value)}
      />

      <Textarea
        placeholder="Space Description"
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <div className="flex items-center gap-4">
        <Switch id="public" onCheckedChange={setPublicSpace} />
        <Label htmlFor="public">Public</Label>
      </div>

      {!publicSpace && (
        <Input
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      )}

      <Button onClick={addSpace}>Submit</Button>
    </div>
  );
}

export default CreateSpaceForm;

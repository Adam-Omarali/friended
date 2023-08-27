"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function CreateSpaceForm() {
  const [spaceName, setSpaceName] = useState("");
  const [description, setDescription] = useState("");
  const [publicSpace, setPublicSpace] = useState(false);
  const [password, setPassword] = useState("");

  async function addSpace() {
    await fetch("/spaces/create/api", {
      method: "POST",
      body: JSON.stringify({
        name: spaceName,
        description: description,
        publicSpace: publicSpace,
        password: password
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
        <Switch id="public" onCheckedChange={(e) => setPublicSpace(e)} />
        <Label htmlFor="public">Public</Label>
      </div>

      {!publicSpace && (
        <Input
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      )}

      <Button onClick={async () => await addSpace()}>Submit</Button>
    </div>
  );
}

export default CreateSpaceForm;

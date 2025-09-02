"use client";
import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchAction, fetchMutation } from "convex/nextjs";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import { useState } from "react";

export default function NewUserPage() {
  const user = useQuery(api.users.currentUser);
  const [name, setName] = useState("");
  if (!user) {
    return <GlobalDataUpdater data={{ loading: true, navBarStyle: "brick" }} />;
  }
  return (
    <div className='flex flex-col justify-center items-center h-dvh w-full'>
      <GlobalDataUpdater data={{ loading: false, navBarStyle: "brick" }} />
      <Card.Card>
        <Card.CardHeader>
          <Card.CardTitle>Welcome!</Card.CardTitle>
          <Card.CardDescription>
            We just need your name before you can start making posts!
            <br />
            Although it is suggested, you do not have to supply your real name.
          </Card.CardDescription>
        </Card.CardHeader>
        <Card.CardContent>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await fetchAction(api.users.editName, {
                userID: user._id,
                name: name,
              });
              await fetchMutation(api.users.editRole, {
                userID: user._id,
                role: "writer",
              });
              await fetchAction(api.allowedemail.addUIDAction, {
                UID: user._id,
                email: user.email!,
              });
            }}
            className='flex flex-col gap-2'
          >
            <Input
              name='name'
              placeholder='Name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type='submit' disabled={name.length === 0}>
              Submit
            </Button>
          </form>
        </Card.CardContent>
      </Card.Card>
    </div>
  );
}

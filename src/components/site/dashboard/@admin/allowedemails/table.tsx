"use client";
import { Button } from "@/components/ui/button";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import {
  ClipboardIcon,
  Loader2,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Doc } from "convex@/_generated/dataModel";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { cn } from "@/lib/utils";

export function AllowedEmailsTable() {
  const [loading, setLoading] = useState(false);

  const { results, status, loadMore } = usePaginatedQuery(
    api.allowedemail.list,
    {},
    { initialNumItems: 6 }
  );

  const hasMore = status === "CanLoadMore";

  const next = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      loadMore(6);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead />
          <TableHead>
            <CreateDialog />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results?.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(item.email).then(() => {
                    toast(
                      `${item.name}'s Email has been copied to your clipboard!`
                    );
                  });
                }}
                size={"icon"}
                variant={"outline"}
              >
                <ClipboardIcon className='w-12 h-12' />
              </Button>
            </TableCell>
            <TableCell>
              <DeleteDialog user={item} />
            </TableCell>
          </TableRow>
        ))}
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={next}
          threshold={0.8}
        >
          {hasMore && (
            <div className='col-span-full flex justify-center py-4'>
              <Loader2 className='h-8 w-8 animate-spin' />
            </div>
          )}
        </InfiniteScroll>
      </TableBody>
    </Table>
  );
}

function DeleteDialog({ user }: { user: Doc<"allowedEmails"> }) {
  const [confirmation, setConfirmationState] = useState("");
  const [open, setOpen] = useState(false);
  const deleteEmail = useMutation(api.allowedemail.deleteEmail);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"}>
          <TrashIcon className='w-12 h-12' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await deleteEmail({ ID: user._id });
            setOpen(false);
            toast(
              `Deleted ${user.email} from allowed emails and locked ${user.name}'s account`
            );
            setConfirmationState("")
          }}
        >
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This will lock {user.name} out of their account permanently. This
              can NOT be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-2 py-4'>
            <Label htmlFor='confirmation'>
              Please type "{user.name}" below to continue
            </Label>
            <Input
              id='confirmation'
              placeholder={`Type "${user.name}" to continue`}
              value={confirmation}
              onChange={(e) => setConfirmationState(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button
              variant={"destructive"}
              disabled={confirmation != user.name}
              type='submit'
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CreateDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const addEmail = useMutation(api.allowedemail.addEmail);
  const alreadyAllowed = useQuery(api.allowedemail.isAllowedEmail, {email})

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} size={"icon"}>
          <PlusIcon className='w-12 h-12' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await addEmail({ name, email });
            setOpen(false);
            toast(`Now allowing ${name}'s email "${email}"`);
            setName("");
            setEmail("");
          }}
        >
          <DialogHeader>
            <DialogTitle>Create a New Allowed Email!</DialogTitle>
            <DialogDescription>
              Adding previously deleted emails will NOT unlock the account(s)!
              <br />
              It is recommened to use real names for this.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>
                Please Type the name of the new user.
              </Label>
              <Input
                id='name'
                placeholder={`First Name Last Name`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>
                Please Type the {name != "" ? name : "new user"}'s email {alreadyAllowed && <><br/><br/><span className="text-destructive">Email already allowed</span></>}
              </Label>
              <Input
                id='email'
                placeholder={`johndoe@example.com`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(alreadyAllowed && "bg-destructive text-white")}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button
              type='submit'
              variant={"default"}
              disabled={name === "" || email === "" || alreadyAllowed}
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

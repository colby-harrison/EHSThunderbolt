"use client";
import { Button } from "@/components/ui/button";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import {
  Table,
  TableBody,
  TableCaption,
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
import {
  useAction,
  useMutation,
  usePaginatedQuery,
  useQuery,
} from "convex/react";
import { api } from "convex@/_generated/api";
import {
  ClipboardIcon,
  Loader2,
  PencilIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Doc } from "convex@/_generated/dataModel";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function UsersTable() {
  const [loading, setLoading] = useState(false);
  const currentUser = useQuery(api.users.currentUser)!;
  const editUserName = useAction(api.users.editName);
  const editUserRole = useMutation(api.users.editRole);
  const editUserReviewStatus = useMutation(api.users.editReviewStatus);

  const { results, status, loadMore } = usePaginatedQuery(
    api.users.list,
    {},
    { initialNumItems: 6 }
  );

  const hasMore = status === "CanLoadMore";

  const next = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      await loadMore(6);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Review Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results?.map((item) => (
          <TableRow
            key={item._id}
            className={cn(!item.reviewed && "bg-destructive text-white")}
          >
            <TableCell>
              {item.image && (
                <img src={item.image} alt={item.name} className='size-16' />
              )}
            </TableCell>
            <TableCell>
              {item.role === "locked" ? (
                <>{item.name}</>
              ) : (
                <Input
                  id='name'
                  name='name'
                  defaultValue={item.name}
                  onBlur={(e) =>
                    editUserName({ name: e.target.value, userID: item._id })
                  }
                />
              )}
            </TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              {item.role === "locked" ? (
                <>Locked</>
              ) : item._id === currentUser._id ? (
                <Tooltip>
                  <TooltipTrigger>Admin</TooltipTrigger>
                  <TooltipContent>
                    <p>You can not change your own role.</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Select
                  defaultValue={item.role || "writer"}
                  onValueChange={(e) =>
                    editUserRole({ userID: item._id, role: e })
                  }
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='admin'>Admin</SelectItem>
                    <SelectItem value='writer'>Writer</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </TableCell>
            <TableCell>
              <Checkbox
                checked={
                  typeof item.reviewed === "boolean" ? item.reviewed : false
                }
                onCheckedChange={() =>
                  editUserReviewStatus({
                    ID: item._id,
                    reviewed: !(typeof item.reviewed === "boolean"
                      ? item.reviewed
                      : false),
                  })
                }
                disabled={item.role === "locked"}
              />
            </TableCell>
            <ActionsCell user={item} />
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

function ActionsCell({ user }: { user: Doc<"users"> }) {
  return (
    <TableCell>
      {/* Copy btn */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(user.email!).then(() => {
                toast(
                  `${user.name}'s Email has been copied to your clipboard!`
                );
              });
            }}
            size={"icon"}
            variant={user.reviewed ? "outline" : "secondary"}
            disabled={!user.email}
          >
            <ClipboardIcon className='w-12 h-12' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy email to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TableCell>
  );
}

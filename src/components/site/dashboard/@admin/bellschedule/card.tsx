"use client";
import { Loading } from "@/components/site/loading";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import { Widgets } from "@/components/widgets";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/radix/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Doc } from "convex@/_generated/dataModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useRef, useEffect } from "react";
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
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/utils";

export default function CardComponent({ user }: { user: Doc<"users"> }) {
  const bellSchedule = useQuery(api.bellschedule.getAll);
  const calendar = useQuery(api.kv.getByKey, { key: "calendar" });
  const updateKV = useMutation(api.kv.set);
  if (!bellSchedule) {
    return <Loading />;
  }
  return (
    <Tabs
      defaultValue='bellschedule'
      className='bg-muted rounded-lg w-full p-1'
    >
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='bellschedule'>Bell Schedule</TabsTrigger>
        <TabsTrigger value='calendar'>Calendar</TabsTrigger>
      </TabsList>
      <TabsContent value='bellschedule'>
        <Card>
          <CardContent className="p-1">
            <div className='w-full'>
              <Tabs
                defaultValue='edit'
                className='bg-muted rounded-lg w-full p-1'
              >
                <TabsList className='flex flex-row w-full gap-1'>
                  <TabsTrigger value='edit'>Edit</TabsTrigger>
                  <TabsTrigger value='view'>View</TabsTrigger>
                </TabsList>
                <TabsContent value='edit'>
                  <Card>
                    <CardContent className="p-1">
                      <Tabs
                        defaultValue={bellSchedule[0]?._id}
                        className='bg-muted rounded-lg w-full p-1'
                      >
                        <TabsList className='flex flex-row w-full gap-1'>
                          {bellSchedule.map((v, index) => {
                            return (
                              <TabsTrigger value={v._id} key={index}>
                                {v.name}
                              </TabsTrigger>
                            );
                          })}
                          <CreateTabDialog />
                        </TabsList>
                        {bellSchedule.map((v, index) => {
                          return <BellScheduleTable item={v} key={index} />;
                        })}
                      </Tabs>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value='view'>
                  <Widgets.BellSchedule.Table />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='calendar' className='p-1'>
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <div className='w-full'>
              <h1 className='prose-h1'>Upload new calendar</h1>
              <UploadDropzone
                endpoint={"calendar"}
                headers={{ Authorization: user._id }}
                onClientUploadComplete={(res) => {
                  updateKV({ key: "calendar", value: res[0]?.key! });
                }}
              />
            </div>
            <div className='w-full brightness-50 hover:brightness-100'>
              <Widgets.BellSchedule.Calendar />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function CreateTabDialog() {
  const [name, setName] = useState("");
  const createTab = useMutation(api.bellschedule.createTab);
  return (
    <Dialog onOpenChange={(v) => v && setName("")}>
      <DialogTrigger asChild>
        <Button variant='tab'>New Tab</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Tab</DialogTitle>
          <DialogDescription>Create a new tab</DialogDescription>
        </DialogHeader>
        <div className='grid gap-2 py-4'>
          <Label htmlFor='tabName'>Name of the new tab</Label>
          <Input
            id='tabName'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                toast(`created tab ${name}`);
                createTab({ name });
                setName("");
              }}
              disabled={name === ""}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BellScheduleTable({ item }: { item: Doc<"bellScheduleTab"> }) {
  const lines = useQuery(api.bellschedule.getLinesByTab, { tab: item._id });
  const createLine = useMutation(api.bellschedule.createLine);

  // track last created line for autofocus
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);

  return (
    <TabsContent value={item._id} className='p-1'>
      <Card>
        <CardHeader>
          <CardTitle className='flex flex-row justify-between'>
            {item.name} <DeleteTabDialog item={item} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Time</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines &&
                lines.map((v, index) => {
                  return (
                    <BellScheduleTableRow
                      item={v}
                      key={index}
                      autoFocus={v._id === lastCreatedId}
                    />
                  );
                })}
            </TableBody>
          </Table>
          <Button
            className='w-full'
            onClick={async () => {
              const id = await createLine({
                tab: item._id,
                period: "",
                periodLine2: "",
                time: "",
                timeLine2: "",
              });
              setLastCreatedId(id);
            }}
          >
            Add Line
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

function DeleteTabDialog({ item }: { item: Doc<"bellScheduleTab"> }) {
  const [confirmation, setConfirmationState] = useState("");
  const delTab = useMutation(api.bellschedule.del);
  return (
    <Dialog onOpenChange={(v) => v && setConfirmationState("")}>
      <DialogTrigger asChild>
        <Button variant='destructive'>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Tab</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this tab? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-2 py-4'>
          <Label htmlFor='confirmation'>
            Please type "{item.name}" below to continue
          </Label>
          <Input
            id='confirmation'
            value={confirmation}
            onChange={(e) => setConfirmationState(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                if (confirmation === item.name) {
                  toast(`Deleted ${item.name}`);
                  delTab({ id: item._id });
                  setConfirmationState("");
                }
              }}
              disabled={item.name !== confirmation}
              variant={"destructive"}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BellScheduleTableRow({
  item,
  autoFocus,
}: {
  item: Doc<"bellScheduleLine">;
  autoFocus?: boolean;
}) {
  const editLine = useMutation(api.bellschedule.updateLine);
  const delLine = useMutation(api.bellschedule.delLine);
  const [period, setPeriod] = useState(item.period);
  const [periodLine2, setPeriodLine2] = useState(item.periodLine2);
  const [time, setTime] = useState(item.time);
  const [timeLine2, setTimeLine2] = useState(item.timeLine2);

  // ref for autofocus when row first mounts
  const periodRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (autoFocus && periodRef.current) {
      periodRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <TableRow>
      <TableCell>
        <Label htmlFor='period'>Period</Label>
        <Input
          ref={periodRef}
          id='period'
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          onBlur={() => editLine({ id: item._id, period })}
        />
        <br />
        <Label htmlFor='periodLine2'>Period Line 2</Label>
        <Input
          id='periodLine2'
          value={periodLine2}
          onChange={(e) => setPeriodLine2(e.target.value)}
          onBlur={() => editLine({ id: item._id, periodLine2 })}
        />
      </TableCell>
      <TableCell>
        <Label htmlFor='time'>Time</Label>
        <Input
          id='time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          onBlur={() => editLine({ id: item._id, time })}
        />
        <br />
        <Label htmlFor='timeLine2'>Time Line 2</Label>
        <Input
          id='timeLine2'
          value={timeLine2}
          onChange={(e) => setTimeLine2(e.target.value)}
          onBlur={() => editLine({ id: item._id, timeLine2 })}
        />
      </TableCell>
      <TableCell className='flex justify-end'>
        <DeleteRowDialog item={item} />
      </TableCell>
    </TableRow>
  );
}

function DeleteRowDialog({ item }: { item: Doc<"bellScheduleLine"> }) {
  const [confirmation, setConfirmationState] = useState("");
  const delLine = useMutation(api.bellschedule.delLine);
  return (
    <Dialog onOpenChange={(v) => v && setConfirmationState("")}>
      <DialogTrigger asChild>
        <Button variant='destructive'>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Row</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this row? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-2 py-4'>
          <Label htmlFor='confirmation'>
            Please type "DELETE" below to continue
          </Label>
          <Input
            id='confirmation'
            value={confirmation}
            onChange={(e) => setConfirmationState(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                if (confirmation === "DELETE") {
                  toast(`Deleted row`);
                  delLine({ id: item._id });
                  setConfirmationState("");
                }
              }}
              disabled={"DELETE" !== confirmation}
              variant={"destructive"}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

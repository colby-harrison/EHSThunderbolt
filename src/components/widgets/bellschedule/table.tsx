"use client";

// Start of imports
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/radix/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as Card from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import { Loading } from "@/components/site/loading";
// End of imports

export default function BellScheduleTable() {
  const bellSchedule = useQuery(api.bellschedule.getAll);
  if (!bellSchedule) {
    return <Loading />;
  }
  return (
    <Card.Card>
      <Tabs defaultValue={bellSchedule[0]?._id}>
        <Card.CardHeader>
          <TabsList>
            {bellSchedule.map((v, index) => {
              return (
                <TabsTrigger value={v._id} key={index}>
                  {v.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Card.CardHeader>
        <Card.CardContent>
          {bellSchedule.map((v, index) => {
            return (
              <TabsContent value={v._id} key={index}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {v.schedule &&
                      v.schedule.map((v, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              {v.period}
                              {v.periodLine2 && (
                                <>
                                  <br />
                                  {v.periodLine2}
                                </>
                              )}
                            </TableCell>
                            <TableCell>
                              {v.time}
                              {v.timeLine2 && (
                                <>
                                  <br />
                                  {v.timeLine2}
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TabsContent>
            );
          })}
        </Card.CardContent>
      </Tabs>
    </Card.Card>
  );
}

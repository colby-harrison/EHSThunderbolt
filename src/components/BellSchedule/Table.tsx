import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BellScheduleTable() {
  return (
    <Tabs defaultValue='a_b'>
      <TabsList>
        <TabsTrigger value='a_b'>A/B-Day</TabsTrigger>
        <TabsTrigger value='c'>C-Day</TabsTrigger>
        <TabsTrigger value='half'>Half-Day</TabsTrigger>
        <TabsTrigger value='delayed'>Delayed-Start</TabsTrigger>
      </TabsList>
      <TabsContent value='a_b'>
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1A/5B Period</TableCell>
              <TableCell>7:45 AM - 9:11 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TBTV<br/>2A/6B Period</TableCell>
              <TableCell>9:17 AM - 9:27 AM<br/>9:27 AM - 10:53 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lunch</TableCell>
              <TableCell>10:59 AM - 11:41 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3A/7B Period</TableCell>
              <TableCell>11:47 AM - 1:13 PM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4A/8B Period</TableCell>
              <TableCell>1:19 PM - 2:45 PM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value='c'>
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1A/5B Period<br/>Advisement</TableCell>
              <TableCell>7:45 AM - 8:57 AM<br/>8:57 AM - 9:12 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Flex</TableCell>
              <TableCell>9:18 AM - 10:03 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2A/6B Period</TableCell>
              <TableCell>10:09 AM - 11:21 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lunch</TableCell>
              <TableCell>11:27 AM - 12:09 PM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3A/7B Period</TableCell>
              <TableCell>12:15 PM - 1:27 PM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4A/8B Period</TableCell>
              <TableCell>1:33 PM - 2:45 PM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value='half'>
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1A/5B Period</TableCell>
              <TableCell>7:45 AM - 8:33 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2A/6B Period</TableCell>
              <TableCell>8:39 AM - 9:27 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3A/7B Period</TableCell>
              <TableCell>9:33 AM - 10:21 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4A/8B Period</TableCell>
              <TableCell>10:27 AM - 11:15 AM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value='delayed'>
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1A/5B Period</TableCell>
              <TableCell>9:45 AM - 10:45 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2A/6B Period</TableCell>
              <TableCell>10:51 AM - 11:51 AM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lunch</TableCell>
              <TableCell>11:56 AM - 12:33 PM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3A/7B Period</TableCell>
              <TableCell>12:39 PM - 1:39 PM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4A/8B Period</TableCell>
              <TableCell>1:45 PM - 2:45 PM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}

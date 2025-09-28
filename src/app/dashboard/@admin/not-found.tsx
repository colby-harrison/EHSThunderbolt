import { DashboardDataUpdater } from "@/components/DashboardProvider";
import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex flex-col h-dvh items-center justify-center'>
      <GlobalDataUpdater data={{ loading: false, navBarStyle: "brick" }} />
      <DashboardDataUpdater
        data={{ dashboardName: "Admin", subpage: "Page Not Found" }}
      />
      <Card.Card>
        <Card.CardHeader>
          <Card.CardTitle>Not Found</Card.CardTitle>
          <Card.CardDescription>
            Could not find the requested resource
          </Card.CardDescription>
        </Card.CardHeader>
        <Card.CardFooter>
          <Button asChild>
            <Link href='/dashboard'>
              <a>Go to Dashboard</a>
            </Link>
          </Button>
          <Button asChild>
            <Link href='/'>
              <a>Go to Home</a>
            </Link>
          </Button>
        </Card.CardFooter>
      </Card.Card>
    </div>
  );
}

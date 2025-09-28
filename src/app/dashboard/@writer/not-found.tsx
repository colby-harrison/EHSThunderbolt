import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex flex-col h-dvh items-center justify-center'>
      <GlobalDataUpdater data={{ showHeader: false, navBarStyle: "none" }} />
      <Card.Card>
        <Card.CardHeader>
          <Card.CardTitle>Not Found</Card.CardTitle>
          <Card.CardDescription>
            Could not find the requested resource
          </Card.CardDescription>
        </Card.CardHeader>
        <Card.CardFooter>
          <Button asChild>
            <Link href='/'>Return Home</Link>
          </Button>
        </Card.CardFooter>
      </Card.Card>
    </div>
  );
}

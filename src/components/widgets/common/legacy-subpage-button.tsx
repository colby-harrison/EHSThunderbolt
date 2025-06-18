"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import * as Card from "@/components/ui/card";
import Link from "next/link";

export default function NavigationLegacyButtonWidget({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  return (
    <Card.LinkedCard href={path} className="hover:text-ehs-blue flex flex-col justify-center items-center">
      <h1 className="prose-h1">{title}</h1>
    </Card.LinkedCard>
  );
}

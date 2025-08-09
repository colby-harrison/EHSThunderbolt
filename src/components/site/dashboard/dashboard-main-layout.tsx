"use client";

import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";

// Async component that handles the role-based rendering
export function DashboardContent({
  newUser,
  writer,
  admin,
}: {
  newUser: React.ReactNode;
  writer: React.ReactNode;
  admin: React.ReactNode;
}) {
  const role = useQuery(api.users.currentUserRole)
  if (role === undefined) {
    return <GlobalDataUpdater data={{ loading: true }} />
  }
  return role === null ? newUser : role === "admin" ? admin : writer;
}
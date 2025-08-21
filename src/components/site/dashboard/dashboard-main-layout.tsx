"use client";

import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import Router from "next/router";

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
  const user = useQuery(api.users.currentUser);
  const role = useQuery(api.users.currentUserRole);
  const router = Router
  if (role === undefined || user === undefined) {
    return <GlobalDataUpdater data={{ loading: true }} />;
  }
  if (user === null) {
    return router.push("/login")
  }
  if (user.role === "locked") {
    return router.push("/")
  }
  return role === null
    ? newUser
    : role === "admin" || role === "rootadmin"
      ? admin
      : writer;
}

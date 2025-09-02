"use client";
import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";

export default function NewUserPage() {
  const user = useQuery(api.users.currentUser);
  if (!user) {
    return <GlobalDataUpdater data={{ loading: true, navBarStyle: "brick"  }} />;
  }
  return (
    <div className='container mx-auto grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <GlobalDataUpdater data={{ loading: false, navBarStyle: "brick"  }} />
      <div className='col-span-2'>
        <h1 className='prose-h1'>Dashboard</h1>
        <p className='prose-p'>This is the dashboard. Hello, {user.name}!</p>
      </div>
    </div>
  );
}

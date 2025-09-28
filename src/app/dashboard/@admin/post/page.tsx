"use client";
import { DashboardDataUpdater } from "@/components/DashboardProvider";
import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { Loading } from "@/components/site/loading";
import { Badge } from "@/components/ui/badge";
import {
  CardDescription,
  CardHeader,
  CardTitle,
  LinkedCard,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";

export default function AdminPage() {
  const user = useQuery(api.users.currentUser);
  const underReview = useQuery(api.posts.UnderReview);
  if (!user) {
    return <Loading />;
  }
  return (
    <div className='gap-4 '>
      <GlobalDataUpdater data={{ loading: false, navBarStyle: "brick" }} />
      <DashboardDataUpdater
        data={{ dashboardName: "Admin", subpage: "Post" }}
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <LinkedCard href='/dashboard/post/new' className='w-full'>
          <CardHeader>
            <CardTitle>New Post</CardTitle>
            <CardDescription>Create a new post</CardDescription>
          </CardHeader>
        </LinkedCard>
        <LinkedCard href='/dashboard/post/view' className='w-full'>
          <CardHeader>
            <CardTitle>View Posts</CardTitle>
            <CardDescription>Post view table</CardDescription>
          </CardHeader>
        </LinkedCard>
        <LinkedCard href='/dashboard/post/under-review' className='w-full'>
          <CardHeader>
            <CardTitle className='inline-flex gap-4 items-center'>
              Posts Under Review
              {underReview && underReview > 0 ? (
                <Badge variant={"destructive_opaque"}>{underReview}</Badge>
              ) : null}
            </CardTitle>
            <CardDescription>Review posts</CardDescription>
          </CardHeader>
        </LinkedCard>
      </div>
    </div>
  );
}

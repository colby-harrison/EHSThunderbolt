"use client";
import {
  Tabs,
  TabsTrigger,
  TabsContent,
  TabsList,
} from "@/components/animate-ui/radix/tabs";
import { DashboardDataUpdater } from "@/components/DashboardProvider";
import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { Loading } from "@/components/site/loading";
import { Button } from "@/components/ui/button";
import { Widgets } from "@/components/widgets";
import type {
  FormElement,
  FormValues,
} from "@/components/widgets/form/form-builder/types";
import { cn } from "@/lib/utils";
import NewPost, { type NewPostProps } from "@/server/post/new";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import type { Id } from "convex@/_generated/dataModel";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const user = useQuery(api.users.currentUser);
  const categories = useQuery(api.categories.getAll);
  const formSchema: readonly FormElement[] = [
    { name: "title", title: "Title", type: "text" },
    { name: "excerpt", title: "Excerpt", type: "text" },
    {
      name: "image",
      title: "Image",
      type: "file",
      uploadEndpoint: "postTitleImage",
      imagePreview: true,
      user: user!,
    },
    {
      name: "category",
      title: "Category",
      type: "select",
      style: "combobox",
      options: categories
        ? categories.map((category) => ({
            value: category._id,
            label: category.name,
          }))
        : [],
      comboboxOptions: {
        placeholder: "Select a category...",
        searchPlaceholder: "Search for a category...",
        emptyNotice: "No categories found.",
      },
    },
  ];
  const [post, setPost] = useState("# Hello World!");
  const [isNotEditor, setIsNotEditor] = useState(true);
  const [metadata, setMetadata] = useState<FormValues<typeof formSchema>>({
    title: "",
    excerpt: "",
    image: "",
  });
  if (!user) {
    return <Loading />;
  }
  const formattedData = useMemo(() => {
    return {
      title: metadata.title,
      excerpt: metadata.excerpt,
      image: metadata.image,
      content: post,
      category: metadata.category as Id<"categories">,
      author: user._id,
      date: new Date(),
    };
  }, [metadata, post, user]);
  return (
    <div className='gap-4 '>
      <GlobalDataUpdater data={{ loading: false, navBarStyle: "brick" }} />
      <DashboardDataUpdater
        data={{ dashboardName: "Admin", subpage: "Post/New" }}
      />
      <Tabs
        defaultValue='metadata'
        className='bg-muted rounded-lg w-full p-1 h-[calc(100dvh-8rem)]'
      >
        <TabsList className='flex flex-row w-full gap-1'>
          <TabsTrigger value='metadata' onClick={() => setIsNotEditor(true)}>
            Metadata
          </TabsTrigger>
          <TabsTrigger value='editor' onClick={() => setIsNotEditor(false)}>
            Editor
          </TabsTrigger>
          <TabsTrigger value='preview' onClick={() => setIsNotEditor(true)}>
            Preview
          </TabsTrigger>
          <Button
            variant='tab'
            className='w-full'
            disabled={!post || !metadata.title || !metadata.excerpt || !metadata.image || !metadata.category || !user || !user._id}
            onClick={() =>
              NewPost(formattedData as NewPostProps).then(() => {
                toast.success("Post submitted successfully");
                setPost("");
                setMetadata({
                  title: "",
                  excerpt: "",
                  image: "",
                  category: "",
                });
              })
            }
          >
            Submit
          </Button>
        </TabsList>
        <TabsContent value='metadata' className='w-full h-full overflow-y-auto'>
          <Widgets.Form.FormBuilder
            formElements={formSchema}
            value={metadata}
            onChange={setMetadata}
          />
        </TabsContent>
        <TabsContent
          value='editor'
          forceMount={true}
          className={cn(isNotEditor && "hidden")}
        >
          <Widgets.Form.RTE
            onChange={(v) => setPost(v || "")}
            value={post}
            className='h-[calc(100dvh-11.5rem)]'
          />
        </TabsContent>
        <TabsContent value='preview'>{post}</TabsContent>
      </Tabs>
    </div>
  );
}

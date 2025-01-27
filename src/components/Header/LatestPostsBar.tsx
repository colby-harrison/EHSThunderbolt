import { useIsMobile } from "@/hooks/use-mobile";
import { Suspense, useState, useEffect } from "react";

type WordPressApiResponse = {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, any>;
  categories: number[];
  tags: number[];
  class_list?: string[];
  _links: Record<string, { href: string; [key: string]: any }[]>;
};


export default function LatestPostsBar() {
  const mobile = useIsMobile();
  const [tempData, setTempData] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://ehsthunderbolt.com/wp-json/wp/v2/posts"
      );
      const data: WordPressApiResponse[] = await response.json();
      setTempData(data[0].title.rendered);
    };
    fetchData();
  }, []);
  return (
    <>
      {!mobile && (
        <Suspense fallback={<Loading />}>
          <div className='flex flex-row justify-center items-center h-full'>
            <h1 className='text-2xl'>{tempData}</h1>
          </div>
        </Suspense>
      )}
    </>
  );
}

function Loading() {
  return (
    <div className='flex flex-row justify-center items-center h-full'>
      <h1 className='text-2xl'>Loading...</h1>
    </div>
  );
}

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
  const [tempData, setTempData] = useState<string | null>(null);

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
  if (mobile) {
    return null;
  }
  return (
    <>
      <div className='flex flex-row items-center h-full'>
        {tempData === null ? (
          <h1 className='text-2xl'>Loading...</h1>
        ) : (
          <>
          <div className="bg-ehs-white text-ehs-black p-1 font-bold">
            <h1 className='text-2xl bold'>Latest posts</h1>
          </div>
          <h1 className='text-2xl'>{tempData}</h1>
          </>
        )}
      </div>
    </>
  );
}
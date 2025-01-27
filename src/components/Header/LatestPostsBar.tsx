import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

type WordPressApiResponse = {
  id: number;
  date: Date;
  date_gmt: Date;
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
  const [tempData, setTempData] = useState<WordPressApiResponse[] | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://ehsthunderbolt.com/wp-json/wp/v2/posts"
      );
      const data: WordPressApiResponse[] = await response.json();
      setTempData(data);
    };
    fetchData();
  }, []);
  if (mobile) {
    return null;
  }
  return (
    <>
      <div className='flex flex-row items-center'>
        {tempData === null ? (
          <h1 className='text-2xl'>Loading...</h1>
        ) : (
          <>
            <div className='bg-ehs-white text-ehs-black p-1 pr-2'>
              <h1 className='text-2xl font-bold whitespace-nowrap'>Latest posts</h1>
            </div>
            <div className='relative overflow-hidden w-full'>
              <motion.div
                className='flex flex-row whitespace-nowrap'
                initial={{ x: "100%" }}
                animate={{ x: "-150%" }}
                transition={{
                  repeat: Infinity,
                  duration: 5*tempData.length, // Adjust this for the speed of scrolling
                  ease: "linear",
                }}
              >
                {tempData.map((post, index) => (
                  <div key={index} className='mx-2'>
                    <a
                      href={post.link}
                      className='hover:bg-ehs-gray/50 text-xs md:text-xl font-bold rounded p-2'
                    >
                      {post.title.rendered} |{" "}
                      {post.date_gmt.toString().split("T")[0]}
                    </a>
                  </div>
                ))}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

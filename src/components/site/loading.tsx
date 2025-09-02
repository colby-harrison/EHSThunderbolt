import { BlinkBlur } from "react-loading-indicators";

export function Loading() {
  return (
    <main className='flex flex-col justify-center items-center w-full h-dvh gap-4'>
      <BlinkBlur color='#62C6F2' size='large' />
      <h1 className='text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight 2xl:text-5xl text-[#215476] text-center'>
        EHS Thunderbolt – Where News Hits Like Thunder
      </h1>
      <p className='prose-p text-[#215476]'>Loading, Please Wait...</p>
    </main>
  );
}

import { api } from "@/trpc/react";

export default function CalendarEmbed(){
  const [calendar] = api.kv.getByKeyNoCache.useSuspenseQuery({key: "calendar"})
  return(
    <>
    {
      calendar ? <object data="/2024-2025-Calendar.pdf" className="w-full h-full"/> : <div>Loading...</div>
    }
    </>
  )
}
export default function GetDate({ date }: { date: Date | string }) {
  if (typeof date === "string") {
    return <span>{new Date(date).toLocaleString()}</span>;
  }
  return <span>{date.toLocaleString()}</span>;
}

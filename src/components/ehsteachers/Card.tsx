import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type teacherProps = {
  id: number;
  name: string;
  picture: string;
  job: string;
};

export default function TeachersCard({ teacher }: { teacher: teacherProps }) {
  return (
    <Card className="max-w-96 flex-shrink">
      <CardHeader>
        <CardTitle>{teacher.name}</CardTitle>
        <CardDescription>{teacher.job}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={teacher.picture} alt={teacher.name} />
      </CardContent>
    </Card>
  );
}

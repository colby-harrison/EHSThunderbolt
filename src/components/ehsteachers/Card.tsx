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
    <Card>
      <CardHeader>
        <CardTitle>
          {teacher.name.split(' ').map((word, index) => (
            <span key={index}>
              {word}
              <br />
            </span>
          ))}
        </CardTitle>
        <CardDescription>{teacher.job}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={teacher.picture} alt={teacher.name} />
      </CardContent>
    </Card>
  );
}

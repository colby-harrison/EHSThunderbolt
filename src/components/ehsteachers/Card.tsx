// Start of imports
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// End of imports

// Start of teacherProps type | DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
// if you do not know what is going on in this section without comments
// you should not be messing with this section
type teacherProps = {
  id: number;
  name: string;
  picture: string;
  job: string;
};
// End of teacherProps type

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

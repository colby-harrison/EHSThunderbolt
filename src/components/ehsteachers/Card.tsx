// Start of imports
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '../ui/input';
import { useState } from 'react';
import { UploadButton } from '@/lib/uploadthing';
import { Button } from '../ui/button';
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

export default function TeachersCard({
  teacher,
  isAdmin,
}: {
  teacher: teacherProps;
  isAdmin: boolean;
}) {
  const [name, setName] = useState(teacher.name);
  const [job, setJob] = useState(teacher.job);
  const [picture, setPicture] = useState(teacher.picture);
  const [uploading, setUploading] = useState(false);
  if (picture === '/CheyenneEast.png') {
    setPicture(
      'https://kzekz7a45c.ufs.sh/f/bt0EuG5lPH505nfkSNHmmQCn1kDqg8htKYWxpoiJ9OjyvdaU',
    );
  }
  if (isAdmin) {
    return (
      <Card>
        <form method="POST" action="/api/teachers/update">
          <CardHeader>
            <CardTitle>
              <Input type="text" id="name" name="name" value={name} onChange={(value) => setName(value.target.value)} />
            </CardTitle>
            <CardDescription><Input type="text" id="job" name="job" value={job} onChange={(value) => setJob(value.target.value)} /></CardDescription>
          </CardHeader>
          <CardContent>
            <img src={picture} alt={teacher.name} />
            <UploadButton
              endpoint="imageUploader"
              onUploadBegin={() => {
                setUploading(true);
              }}
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log('Files: ', res);
                alert('Upload Completed');
                setPicture(res[0].url);
                setUploading(false);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
                setUploading(false);
              }}
            />
            <Input
              type="text"
              id="picture"
              name="picture"
              value={picture}
              onChange={(value) => setPicture(value.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={uploading}>
              Save
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }
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
        <img src={picture} alt={teacher.name} />
      </CardContent>
    </Card>
  );
}

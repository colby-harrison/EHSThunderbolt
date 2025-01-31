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
// import { UploadButton } from '@/lib/uploadthing';
import { Button } from '../ui/button';
import data from '@/server/queries';
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
  // const [uploading, setUploading] = useState(false);
  if (picture === '/CheyenneEast.png') {
    setPicture('bt0EuG5lPH505nfkSNHmmQCn1kDqg8htKYWxpoiJ9OjyvdaU');
  }
  if (isAdmin) {
    return (
      <Card>
        <form method="POST">
          <CardHeader>
            <CardTitle>
              <Input type="hidden" name="id" value={teacher.id} />
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(value) => setName(value.target.value)}
              />
            </CardTitle>
            <CardDescription>
              <Input
                type="text"
                id="job"
                name="job"
                value={job}
                onChange={(value) => setJob(value.target.value)}
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src={`https://kzekz7a45c.ufs.sh/f/${picture}`}
              alt={teacher.name}
            />
            {/* <UploadButton
              endpoint="imageUploader"
              onUploadBegin={() => setUploading(true)}
              onClientUploadComplete={(res) => {
                console.log('Files: ', res);
                if (res && res[0]) {
                  setPicture(res[0].url);
                  alert('Upload Completed');
                }
                setUploading(false);
              }}
              onUploadError={(error: Error) => {
                alert(`Upload failed: ${error.message}`);
                setUploading(false);
              }}
            /> */}
            <Input
              type="text"
              id="picture"
              name="picture"
              value={picture}
              onChange={(value) => setPicture(value.target.value)}
            />
            <Input type="hidden" name="type" value="update" />
          </CardContent>
          <CardFooter>
            <Button type="submit">Edit</Button>
            <Button onClick={() => data.post.teachers.delete(teacher.id)}>
              Delete
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
        <img
          src={`https://kzekz7a45c.ufs.sh/f/${picture}`}
          alt={teacher.name}
        />
      </CardContent>
    </Card>
  );
}

export type teacher = {
  id: number;
  name: string;
  picture: string;
  job: string;
};

export type author = {
  id: string;
  clerkId: string;
  name: string;
  admin: boolean;
};

export type catagory = {
  id: string;
  name: string;
};

export type post = {
  id: string;
  title: string;
  content: string;
  author: string;
  catagory: string;
  needsReview: boolean;
  published: boolean;
  date: Date;
};

export type teacherCreate = {
  name: string;
  picture: string;
  job: string;
};

export type authorCreate = {
  clerkId: string;
  name: string;
  admin: boolean;
};

export type catagoryCreate = {
  name: string;
};

export type postCreate = {
  title: string;
  content: string;
  author: string;
  catagory: string;
  needsReview: boolean;
  published: boolean;
};
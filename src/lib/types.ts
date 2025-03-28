// types, DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
// if you do not know what is going on in this file without comments
// you should not be messing with this file

// Start of database types
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

export type category = {
  id: string;
  name: string;
};

export type post = {
  id: string;
  title: string;
  description: string;
  content: {
    type: string;
    content: [];
  } | string;
  author: string;
  category: string;
  needsReview: boolean;
  published: boolean;
  image: string;
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

export type categoryCreate = {
  name: string;
};

export type postCreate = {
  title: string;
  description: string;
  content: string;
  author: string;
  category: string;
  needsReview: boolean;
  published: boolean;
  image: string;
};

export type image = {
  id: string;
  fullUrl: string;
  size: number;
  type: string;
  author: string;
};

export type tbtv = {
  id: string;
  title: string;
  url: string;
};

export type imageCreate = {
  fileName: string;
  fileBuffer: ArrayBuffer;
  size: number;
  type: string;
  author: string;
};

export type tbtvCreate = {
  title: string;
  url: string;
};

// End of database types

// other types
/**
 * Type for form inputs;
 * used to make modular forms easily
 */
export type FormInput = {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
};

// audit log types
/**
 * Type for audit log creation
 */
export type auditLogCreate = {
  table: string;
  action: string;
  user: string;
  admin: boolean;
  data: string;
};
/**
 * Type for audit log
 */
export type auditLog = auditLogCreate & {
  id: number;
  date: Date;
}
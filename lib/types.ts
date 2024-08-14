export interface FileType {
  users: User[];
  posts: Post[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface Post {
  userId: string;
  postedAt: string;
  title: string;
  text: string;
}

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

export type PostItem = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type PostUser = {
  name: string;
  job: string;
};

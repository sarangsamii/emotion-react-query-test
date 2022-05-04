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

export type PostList = {
  posts:PostItem[]
}


export type PostUser = {
  name: string;
  job: string;
};

declare module '@emotion/react' {
  export interface Theme {
    backgroundColor: string,
    text: string,
    colors : {
      primary: string;
      secondary: string;
    };
  }
}

export type ContextType = {
  dark:boolean
  toggleDark:()=>void
}
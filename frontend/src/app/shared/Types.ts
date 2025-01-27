export interface Article {
  _id?: string;
  title: string;
  body: string;
  author?: string;
  image: string;
  category: string;
  publishDate?: string;
  lastUpdate?: string;
  comments?: string[] | Comment[];
  likes?: number;
  readingTime: string;
  posts?: Article[];
}

export interface User {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email: string | null | undefined;
  mobile?: string | null | undefined;
  password: string | null | undefined;
  avatar?: string;
}

export interface Comment {
  id?: string | null | undefined;
  articleId: string;
  userId: string;
  comment: string;
  date: string;
  likes: number;
  replys: Reply[];
}

export interface Reply {
  id?: string | null | undefined;
  commentId: string;
  userId: string;
  reply: string;
  date: string;
  likes: number;
}

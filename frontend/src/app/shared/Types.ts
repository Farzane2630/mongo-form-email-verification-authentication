export interface Article {
  id: number;
  category: string;
  title: string;
  sammary?: string;
  content?: string;
  publish_date: Date;
  reading_time: number;
  img_src: string;
}

export interface User {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email: string | null | undefined;
  mobile?: string | null | undefined;
  password: string | null | undefined;
}
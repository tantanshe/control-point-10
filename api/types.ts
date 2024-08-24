export interface Article {
  id?: string;
  name: string;
  text: string;
  image: string | null;
  createdAt: string;
}

export interface Comment {
  id?: string;
  articleId: string;
  author: string;
  text: string;
}
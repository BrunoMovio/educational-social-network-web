export type Repository = {
  id: string;
  username: string;
  creationDate: string;
  lastUpdateDate: string;
  repositoryTitle: string;
  repositoryDescription: string;
  stars: number;
  hasLiked: boolean;
  posts: Post[];
};

export type Post = {
  id: string;
  username: string;
  repositoryTitle: string;
  creationDate: string;
  lastUpdateDate: string;
  stars: number;
  hasLiked: boolean;
  title: string;
  subtitle: string;
  text: string;
  image?: string;
};

export type Repository = {
  id: string;
  title: string;
  description: string;
  username: string;
  creationDate: string;
  lastUpdateDate: string;
  stars: number;
  hasLiked: boolean;
};

export type Post = {
  id: string;
  username: string;
  repositoryTitle: string;
  repositoryId: string;
  creationDate: string;
  lastUpdateDate: string;
  stars: number;
  hasLiked: boolean;
  title: string;
  subtitle: string;
  text: string;
  image?: string;
};

export type CreateRepositoryForm = {
  title: string;
  description: string;
};

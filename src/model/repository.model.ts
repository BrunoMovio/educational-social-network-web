export type Repository = {
  id: string;
  title: string;
  description: string;
  repositoryNickname: string;
  creationDate: string;
  lastUpdateDate: string;
};

export type RepositoryDatasource = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  lastUpdateDate: string;
  nickname: string;
};

export type CreateRepositoryForm = {
  title: string;
  description: string;
};

export type EditRepositoryForm = {
  title: string;
  description: string;
};

export type Post = {
  id: string;
  repositoryNickname: string;
  repositoryTitle: string;
  repositoryId: string;
  creationDate: string;
  lastUpdateDate: string;
  stars: number;
  likeList: string[];
  title: string;
  subtitle: string;
  text: string;
  image?: string;
};

export type PostDatasource = {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  image: string;
  tags: {
    category: string;
  };
  verified: boolean;
  verifiedBy: string;
  likes: number;
  usersLiked: string[];
  userId: string;
  nickname: string;
  repositoryId: string;
  repositoryTitle: string;
  creationDate: string;
  lastUpdateDate: string;
};

export type CreatePostForm = {
  title: string;
  subtitle: string;
  text: string;
};

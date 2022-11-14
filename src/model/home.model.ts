import { Post } from "./repository.model";

export interface HomePostCardData extends Post {}

export type HomeRecommendationCardData = {
  id: string;
  username: string;
  stars: number;
  hasLiked: boolean;
  repositoryTitle: string;
  repositoryDescription: string;
};

export type HomeData = {
  mainHomePosts: HomePostCardData[];
  mainRecommendationsPosts: HomeRecommendationCardData[];
};

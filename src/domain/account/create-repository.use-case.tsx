import { Repository } from "@src/model";
import { nextApi } from "@src/services";

interface UseCreateRepository {
  createRepository: (data: CreateRepositoryData) => Promise<Repository>;
}

interface CreateRepositoryData {
  userId: string;
  title: string;
}

export const useCreateRepository = (): UseCreateRepository => {
  const createRepository = async ({
    userId,
    title,
  }: CreateRepositoryData): Promise<Repository> => {
    const { data } = await nextApi.post("/repository/create", {
      input: {
        userId,
        name: title,
      },
    });

    return {
      id: data.id,
      username: "fe-jcorreia",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      title: data.name,
      description: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    };
  };

  return { createRepository };
};

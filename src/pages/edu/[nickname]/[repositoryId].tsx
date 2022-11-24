import React from "react";
import { Flex, Grid, GridItem, Image, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { ParsedUrlQuery } from "querystring";

import { api } from "@src/services";
import {
  Post,
  PostDatasource,
  Repository,
  RepositoryDatasource,
} from "@src/model";
import { Header } from "@src/components";
import { useAuthenticate } from "@src/domain/account";
import { RepositoryDescriptionStatic } from "@src/modules/repository";
import { PostList, PostView } from "@src/modules/post";
import { RepositoryDescriptionEdit } from "@src/modules/repository/repository-description-edit";

interface RepositoryProps {
  repository: Repository;
  posts: Post[];
}

interface ServerSideRepositoryParams extends ParsedUrlQuery {
  repository: string;
}

export default function RepositoryPage({
  repository: repositoryProps,
  posts,
}: RepositoryProps) {
  const { logged, loading } = useAuthenticate();
  const [showPost, setShowPost] = React.useState<Post>();

  const [repository, setRepository] =
    React.useState<Repository>(repositoryProps);
  const [editRepository, setEditRepository] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !logged) {
      Router.push("/");
    }
  }, [logged, loading]);

  if (loading || !logged) {
    return (
      <Flex w="100%" h="100vh" alignItems="center" justify="center">
        <Image src="/book.gif" alt="Book Gif" />
      </Flex>
    );
  }

  return (
    <>
      <Header />

      <Grid
        templateColumns="repeat(5, 1fr)"
        maxWidth="1080px"
        mx="auto"
        py="3rem"
      >
        <GridItem colStart={1} colEnd={3}>
          <VStack spacing="5rem" align="start">
            {!editRepository ? (
              <RepositoryDescriptionStatic
                onSetEditRepository={setEditRepository}
                repository={repository}
              />
            ) : (
              <RepositoryDescriptionEdit
                repository={repository}
                nickname={repository.repositoryNickname}
                onSetRepository={setRepository}
                onSetEditRepository={setEditRepository}
              />
            )}

            <PostList
              posts={posts}
              repositoryId={repository.id}
              onSetShowPost={setShowPost}
            />
          </VStack>
        </GridItem>

        <GridItem colStart={3} colEnd={6}>
          <PostView showPost={showPost} />
        </GridItem>
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { repositoryId } = params as ServerSideRepositoryParams;

  const repositoryResponse = await api.get(`/folder/${repositoryId}`);
  const repositoryData: RepositoryDatasource = repositoryResponse.data;
  const repository: Repository = {
    id: repositoryData.id,
    title: repositoryData.title,
    description: repositoryData.description,
    repositoryNickname: repositoryData.nickname,
    creationDate: repositoryData.creationDate,
    lastUpdateDate: repositoryData.lastUpdateDate,
  };

  const postsResponse = await api.get(`/post/folder/${repositoryId}`);
  const postsData = postsResponse.data;
  const posts = postsData.map((post: PostDatasource) => {
    return {
      id: post.id,
      repositoryNickname: post.nickname,
      creationDate: post.creationDate,
      lastUpdateDate: post.lastUpdateDate,
      repositoryTitle: post.repositoryTitle,
      repositoryId: post.repositoryId,
      title: post.title,
      subtitle: post.subtitle,
      text: post.text,
      image: post.image,
      stars: post.likes,
      likeList: post.usersLiked,
    };
  });

  return {
    props: {
      repository,
      posts,
    },
  };
};

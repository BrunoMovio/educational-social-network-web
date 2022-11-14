import React from "react";
import {
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { Post, Repository } from "@src/model";
import { Header, PostPage } from "@src/components";
import Router from "next/router";
import { useAuthenticate } from "@src/domain/account";
import { FiBook, FiBookmark, FiFile } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { AppStrings, replaceTemplateString } from "@src/strings";
import { getLowerCasePastTime } from "@src/utils";

interface RepositoryProps {
  repositoryPage: Repository;
}

interface ServerSideRepositoryParams extends ParsedUrlQuery {
  repository: string;
}

const strings = AppStrings.Home.repositoryCards;

export default function RepositoryPage({ repositoryPage }: RepositoryProps) {
  const { lastUpdateDate, stars, hasLiked, posts } = repositoryPage;

  const { logged, loading } = useAuthenticate();
  const [liked, setLiked] = React.useState(hasLiked);
  const [showPost, setShowPost] = React.useState<Post>();

  const handleUpdateRepositoryStars = () => {
    console.log("update star");
    setLiked((prevState) => !prevState);
  };

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

  const PostTopic = ({ post }: { post: Post }) => {
    return (
      <Link w="100%" onClick={() => setShowPost(post)}>
        <Heading mb="0.25rem" fontSize="2xl" textAlign="start">
          {post.title}
        </Heading>
        <Heading mb="0.5rem" fontSize="sm" textAlign="start">
          {post.title}
        </Heading>
        <Divider />
      </Link>
    );
  };

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
            <VStack spacing={4} align="start">
              <HStack spacing={2}>
                <Icon as={FiBook} />
                <Heading size="md" mb="2rem">
                  fe-jcorreia / myApp
                </Heading>
                <Text fontSize="xs">Criado há 4 meses</Text>
              </HStack>

              <HStack spacing="2rem">
                <Link onClick={handleUpdateRepositoryStars}>
                  <Flex>
                    <Icon
                      size="xs"
                      as={FaStar}
                      color={liked ? "orange" : ""}
                      mr="0.2rem"
                    />{" "}
                    <Text fontSize="sm">{stars}</Text>
                  </Flex>
                </Link>

                {lastUpdateDate && (
                  <Text fontSize="xs">
                    {replaceTemplateString(strings.updatedAt, {
                      date: getLowerCasePastTime(new Date(lastUpdateDate)),
                    })}
                  </Text>
                )}
              </HStack>
            </VStack>

            <VStack spacing={4} align="start">
              <HStack spacing={6}>
                <Heading size="md">Postagens</Heading>
                <Button
                  leftIcon={<Icon as={FiBookmark} />}
                  colorScheme="green"
                  size="xs"
                  justifyContent="flex-end"
                  onClick={() => {}}
                >
                  Criar
                </Button>
              </HStack>

              <Divider />
              {posts.map((post) => (
                <PostTopic key={post.id} post={post} />
              ))}
            </VStack>
          </VStack>
        </GridItem>

        <GridItem colStart={3} colEnd={6}>
          {showPost ? (
            <VStack spacing={6} align="center">
              <PostPage
                postData={{
                  stars: showPost.stars,
                  hasLiked: showPost.hasLiked,
                  lastUpdateDate: showPost.lastUpdateDate,
                  title: showPost.title,
                  subtitle: showPost.subtitle,
                  text: showPost.text,
                  image: showPost.image,
                }}
              />
            </VStack>
          ) : (
            <VStack spacing={6} align="center">
              <Icon as={FiFile} w={200} h={200} />
              <Heading size="md">Nenhum post selecionado</Heading>
            </VStack>
          )}
        </GridItem>
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { repository } = params as ServerSideRepositoryParams;

  console.log("GET ", repository);
  const response: Repository = MOCK_DATA;

  return {
    props: {
      repositoryPage: response,
    },
  };
};

const MOCK_DATA = {
  id: "1",
  username: "fe-jcorreia",
  creationDate: "2022-07-29",
  lastUpdateDate: "2022-08-22",
  repositoryTitle: "myApp",
  repositoryDescription: "App de prática dos conhecimentos em NodeJS",
  stars: 15,
  hasLiked: false,
  posts: [
    {
      id: "1232-9502-8523",
      username: "tamy_takara",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais",
      title: "Lorem Ipsum",
      subtitle: "Lorem Ipsum origin and uses.",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: "https://picsum.photos/500/400",
      stars: 98,
      hasLiked: false,
    },
    {
      id: "1232-9502-8512",
      username: "tamy_takara",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais",
      title: "Lorem Lorem",
      subtitle: "Lorem Ipsum origin and uses.",
      text: "ting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: "https://picsum.photos/500/400",
      stars: 98,
      hasLiked: false,
    },
  ],
};

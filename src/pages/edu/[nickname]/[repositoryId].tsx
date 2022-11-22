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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { Post, Repository, RepositoryDatasource } from "@src/model";
import { Header, PostPage } from "@src/components";
import Router from "next/router";
import { useAuthenticate } from "@src/domain/account";
import { FiBook, FiBookmark, FiFile } from "react-icons/fi";
import { AppStrings, replaceTemplateString } from "@src/strings";
import { getLowerCasePastTime } from "@src/utils";
import { api } from "@src/services";
import { BiEditAlt } from "react-icons/bi";

interface RepositoryProps {
  repositoryPage: Repository;
  posts: Post[];
  nickname: string;
}

interface ServerSideRepositoryParams extends ParsedUrlQuery {
  repository: string;
  nickname: string;
}

const strings = AppStrings.Home.repositoryCards;

export default function RepositoryPage({
  repositoryPage,
  posts,
  nickname,
}: RepositoryProps) {
  const {
    repositoryNickname,
    title,
    description,
    creationDate,
    lastUpdateDate,
  } = repositoryPage;

  const { user, logged, loading } = useAuthenticate();
  const [showPost, setShowPost] = React.useState<Post>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

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
          {post.subtitle}
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
                <Heading size="md">
                  <Icon as={FiBook} />{" "}
                  <Link href={`/edu/${nickname}`}>{repositoryNickname}</Link> /{" "}
                  {title}
                </Heading>
              </HStack>

              <Text size="lg" fontWeight={500}>
                {description}
              </Text>

              <HStack spacing="2rem">
                {creationDate && (
                  <Text fontSize="xs">
                    {replaceTemplateString(strings.createdAt, {
                      date: getLowerCasePastTime(new Date(creationDate)),
                    })}
                  </Text>
                )}

                {lastUpdateDate && (
                  <Text fontSize="xs">
                    {replaceTemplateString(strings.updatedAt, {
                      date: getLowerCasePastTime(new Date(lastUpdateDate)),
                    })}
                  </Text>
                )}
              </HStack>

              {user?.nickname === nickname && (
                <Button variant="outline" onClick={() => {}} colorScheme="teal">
                  <Icon mr="0.5rem" as={BiEditAlt} /> Editar
                </Button>
              )}
            </VStack>

            <VStack spacing={4} align="start">
              <HStack spacing={6}>
                <Heading size="md">Postagens</Heading>
                <Button
                  leftIcon={<Icon as={FiBookmark} />}
                  colorScheme="green"
                  size="xs"
                  justifyContent="flex-end"
                  onClick={onOpen}
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

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.900" fontSize="3xl">
            Criar novo post
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>test</ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { repositoryId, nickname } = params as ServerSideRepositoryParams;

  const repositoryResponse = await api.get(`/folder/${repositoryId}`);
  const repositoryData: RepositoryDatasource = repositoryResponse.data;

  const response: Repository = {
    id: repositoryData.id,
    title: repositoryData.title,
    description: repositoryData.description,
    repositoryNickname: repositoryData.nickname,
    creationDate: repositoryData.creationDate,
    lastUpdateDate: repositoryData.lastUpdateDate,
  };

  const postsResponse = await api.get(`/post/folder/${repositoryId}`);
  const postsData = postsResponse.data;
  const postsRes = postsData.map(
    (post: {
      id: string;
      name: string;
      markdown: string;
      likes: number;
      tags: { category: string };
      folderId: string;
      userId: string;
    }) => {
      return {
        id: post.id,
        repositoryNickname: "fe-jcorreia",
        creationDate: "2022-07-29",
        lastUpdateDate: "2022-08-17",
        repositoryTitle: "Primeira Pasta",
        repositoryId: post.folderId,
        title: post.name,
        subtitle: "Tutorial prático da implementação de um Vector em C",
        text: post.markdown,
        image: "https://picsum.photos/500/400",
        stars: post.likes,
        hasLiked: false,
      };
    }
  );

  return {
    props: {
      repositoryPage: response,
      posts: postsRes,
      nickname,
    },
  };
};

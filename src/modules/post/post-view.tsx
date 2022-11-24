import { Heading, Icon, VStack } from "@chakra-ui/react";
import { useAuthenticate } from "@src/domain/account";
import { Post } from "@src/model";
import React from "react";
import { FiFile } from "react-icons/fi";
import { PostPage } from "./post.component";

interface PostViewProps {
  showPost?: Post;
}

export const PostView = ({ showPost }: PostViewProps) => {
  const { user } = useAuthenticate();

  return (
    <>
      {showPost ? (
        <VStack spacing={6} align="center">
          <PostPage
            postData={{
              stars: showPost.stars,
              hasLiked: showPost.likeList.includes(user.id),
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
    </>
  );
};

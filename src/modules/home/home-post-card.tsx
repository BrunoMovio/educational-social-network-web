import { Avatar, Box, Divider, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { HomePostCardData, Post } from "@src/model";
import { AppStrings } from "@src/strings";
import { getPastTime } from "@src/utils";
import { PostComponent } from "../post";

interface PostComponentProps {
  post: Post;
}

const strings = AppStrings.Home.repositoryCards;

export const HomePostCard = (props: PostComponentProps) => {
  const {
    repositoryNickname,
    stars,
    likeList,
    creationDate,
    lastUpdateDate,
    repositoryTitle,
    title,
    subtitle,
    text,
    image,
  } = props?.post;

  return (
    <Box maxW="70%" mx="auto">
      <Flex align="center" mb="0.5rem">
        <Link href={`/edu/${repositoryNickname}`}>
          <Avatar size="sm" name={repositoryNickname} mr="0.5rem" />
        </Link>
        <Text mr="0.5rem">
          <Link href={`/edu/${repositoryNickname}`}>
            <strong>{repositoryNickname}</strong>
          </Link>
          {strings.sharedRepository}
          <Link href={`/edu/${repositoryNickname}/${repositoryTitle}`}>
            <strong>{strings.post}</strong>
          </Link>
        </Text>
        <Text fontSize="xs">{getPastTime(new Date(creationDate))}</Text>
      </Flex>

      <PostComponent
        postData={{
          stars,
          likeList,
          lastUpdateDate,
          title,
          subtitle,
          text,
          image,
        }}
      />

      <Divider my="1.5rem" />
    </Box>
  );
};

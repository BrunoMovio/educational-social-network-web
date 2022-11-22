import { Avatar, Box, Divider, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { HomePostCardData } from "@src/model";
import { AppStrings } from "@src/strings";
import { getPastTime } from "@src/utils";
import { PostPage } from "../post";

interface PostComponentProps {
  mainHomePosts: HomePostCardData;
}

const strings = AppStrings.Home.repositoryCards;

export const HomePostCard = (props: PostComponentProps) => {
  const {
    username,
    stars,
    hasLiked,
    creationDate,
    lastUpdateDate,
    repositoryTitle,
    title,
    subtitle,
    text,
    image,
  } = props?.mainHomePosts;

  return (
    <Box maxW="70%" mx="auto">
      <Flex align="center" mb="0.5rem">
        <Link href={`/edu/${username}`}>
          <Avatar size="sm" name={username} mr="0.5rem" />
        </Link>
        <Text mr="0.5rem">
          <Link href={`/edu/${username}`}>
            <strong>{username}</strong>
          </Link>
          {strings.sharedRepository}
          <Link href={`/edu/${username}/${repositoryTitle}`}>
            <strong>{strings.post}</strong>
          </Link>
        </Text>
        <Text fontSize="xs">{getPastTime(new Date(creationDate))}</Text>
      </Flex>

      <PostPage
        postData={{
          stars,
          hasLiked,
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

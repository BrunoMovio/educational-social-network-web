import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { AppStrings, replaceTemplateString } from "@src/strings";
import { getLowerCasePastTime } from "@src/utils";
import { useAuthenticate } from "@src/domain/account";

interface RepositoryCardProps {
  postData: {
    stars: number;
    likeList: string[];
    lastUpdateDate: string;
    title: string;
    subtitle: string;
    text: string;
    image?: string;
  };
}

const strings = AppStrings.Home.repositoryCards;

export const PostComponent = ({ postData }: RepositoryCardProps) => {
  const { stars, likeList, lastUpdateDate, title, subtitle, text, image } =
    postData;
  const { user } = useAuthenticate();

  const [trimText, setTrimText] = React.useState(true);
  const [liked, setLiked] = React.useState(likeList.includes(user.id));

  const handleUpdateRepositoryStars = () => {
    console.log("update star");
    setLiked((prevState) => !prevState);
  };

  return (
    <Box
      p="0.75rem"
      border="1px"
      borderColor="gray.300"
      borderRadius="10px"
      w="100%"
    >
      <Heading mb="0.25rem" fontSize="2xl" textAlign="start">
        {title}
      </Heading>
      <Heading mb="0.5rem" fontSize="sm" textAlign="start">
        {subtitle}
      </Heading>
      <Text fontSize="sm" mb="1rem" textAlign="justify">
        {trimText ? text.split(" ").slice(0, 50).join(" ") : text}
        {trimText && (
          <Link>
            <strong onClick={() => setTrimText(false)}> Ver mais...</strong>
          </Link>
        )}
      </Text>
      {image && (
        <Image
          boxSize="100%"
          objectFit="cover"
          src={image}
          alt="image"
          mb="1rem"
        />
      )}

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
    </Box>
  );
};

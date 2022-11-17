import React from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { AppStrings, replaceTemplateString } from "@src/strings";
import { getLowerCasePastTime } from "@src/utils";
import { Repository } from "@src/model";

interface RepositoryCardProps {
  repositoryCard: Repository;
  username: string;
}

const strings = AppStrings.Home.repositoryCards;

export const RepositoryCard = ({
  repositoryCard,
  username,
}: RepositoryCardProps) => {
  const { id, stars, hasLiked, lastUpdateDate, title, description } =
    repositoryCard;

  const [liked, setLiked] = React.useState(hasLiked);

  const handleUpdateRepositoryStars = () => {
    console.log("update star");
    setLiked((prevState) => !prevState);
  };

  return (
    <>
      <Box
        p="0.75rem"
        border="1px"
        borderColor="gray.300"
        borderRadius="10px"
        w="100%"
      >
        <Link href={`/edu/${username}/${id}`}>
          <Heading mb="0.25rem" fontSize="lg">
            {title}
          </Heading>
          <Text fontSize="sm" mb="0.5rem">
            {description}
          </Text>
        </Link>

        <HStack spacing="2rem">
          <Link onClick={handleUpdateRepositoryStars}>
            <Flex>
              <Icon
                size="xs"
                as={FaStar}
                color={liked ? "orange" : ""}
                mr="0.2rem"
              />{" "}
              <Text fontSize="xs">{stars}</Text>
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
      <Divider />
    </>
  );
};

import React from "react";
import {
  Button,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiBook } from "react-icons/fi";
import { AppStrings, replaceTemplateString } from "@src/strings";
import { getLowerCasePastTime } from "@src/utils";
import { BiEditAlt } from "react-icons/bi";
import { useAuthenticate } from "@src/domain/account";
import { Repository } from "@src/model";

interface RepositoryDescriptionStaticProps {
  repository: Repository;
}

const strings = AppStrings.Home.repositoryCards;

export const RepositoryDescriptionStatic = ({
  repository,
}: RepositoryDescriptionStaticProps) => {
  const {
    repositoryNickname,
    title,
    description,
    creationDate,
    lastUpdateDate,
  } = repository;
  const { user } = useAuthenticate();

  return (
    <VStack spacing="5rem" align="start">
      <VStack spacing={4} align="start">
        <HStack spacing={2}>
          <Heading size="md">
            <Icon as={FiBook} />{" "}
            <Link href={`/edu/${repositoryNickname}`}>
              {repositoryNickname}
            </Link>{" "}
            / {title}
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

        {user?.nickname === repositoryNickname && (
          <Button variant="outline" onClick={() => {}} colorScheme="teal">
            <Icon mr="0.5rem" as={BiEditAlt} /> Editar
          </Button>
        )}
      </VStack>
    </VStack>
  );
};
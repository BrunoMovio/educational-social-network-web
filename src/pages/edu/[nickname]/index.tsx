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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Header, RepositoryCard } from "@src/components";

import { Repository, User } from "@src/model";
import { AppStrings } from "@src/strings";
import { useAuthenticate } from "@src/domain/account";
import Router from "next/router";
import { api } from "@src/services";
import { ProfileDescription } from "@src/modules/profile";
import { FiBookmark } from "react-icons/fi";
import { CreateRepositoryComponent } from "@src/modules/repository";

interface ProfileProps {
  userData: User;
  repositoryData: Repository[];
}

interface ServerSideProfileParams extends ParsedUrlQuery {
  nickname: string;
}

const strings = AppStrings.Profile;

export default function Profile({ userData, repositoryData }: ProfileProps) {
  const [repositories, setRepositories] =
    React.useState<Repository[]>(repositoryData);
  const { nickname } = userData;

  const { logged, loading } = useAuthenticate();

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

  return (
    <>
      <Header />

      <Grid templateColumns="repeat(5, 1fr)" mx="1rem" pt="1rem">
        <GridItem colStart={1} colEnd={3}>
          <ProfileDescription userData={userData} />
        </GridItem>

        <GridItem colStart={3} colEnd={6}>
          <VStack spacing={6} py="3rem" px="3rem" w="100%" align="start">
            <HStack spacing={4} mb="2rem">
              <Heading size="md">{strings.myRepositories}</Heading>
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
            {repositories?.map((repository) => (
              <>
                <RepositoryCard
                  key={repository.id}
                  repositoryCard={repository}
                  username={nickname}
                />
                <Divider />
              </>
            ))}
          </VStack>
        </GridItem>
      </Grid>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.900" fontSize="2xl">
            Criar novo repositório
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateRepositoryComponent
              onSetRepositories={setRepositories}
              onCreationCompleted={onClose}
            />
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { nickname } = params as ServerSideProfileParams;

  const userResponse = await api.get(`/user/nickname/${nickname}`);
  const user = userResponse.data;

  const userData = {
    id: user.id,
    name: user.name,
    description: user.description,
    email: user.email,
    career: user.career,
    role: user.role,
    nickname: user.nickname,
    location: {
      city: user.city,
      state: user.state,
      country: user.country,
    },
  };

  const repositoryResponse = await api.get(`/folder/user/${user.id}`);
  console.log(repositoryResponse.data);

  const TODO_repository = repositoryResponse?.data?.map(
    (repository: { id: string; name: string }) => {
      return {
        id: repository.id,
        username: "fe-jcorreia",
        creationDate: "2022-07-29",
        lastUpdateDate: "2022-08-22",
        title: repository.name,
        description: "App de prática dos conhecimentos em NodeJS",
        stars: 15,
        hasLiked: false,
      };
    }
  );

  return {
    props: {
      userData,
      repositoryData: TODO_repository,
    },
  };
};

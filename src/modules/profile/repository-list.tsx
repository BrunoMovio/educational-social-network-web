import {
  Button,
  Heading,
  HStack,
  Icon,
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
import { Repository, User } from "@src/model";
import { AppStrings } from "@src/strings";
import React from "react";
import { FiBookmark } from "react-icons/fi";
import { CreateRepositoryComponent, RepositoryCard } from "../repository";

interface RepositoryListProps {
  user: User;
  repositoryList: Repository[];
}

const strings = AppStrings.Profile;

export const RepositoryList = ({
  user,
  repositoryList,
}: RepositoryListProps) => {
  const [repositories, setRepositories] =
    React.useState<Repository[]>(repositoryList);

  const { nickname } = user;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  return (
    <>
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
          <RepositoryCard
            key={repository.id}
            repositoryCard={repository}
            username={nickname}
          />
        ))}
      </VStack>

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
};

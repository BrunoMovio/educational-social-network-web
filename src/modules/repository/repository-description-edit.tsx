import React from "react";
import {
  Button,
  Heading,
  HStack,
  Icon,
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
import { EditRepositoryForm, Repository } from "@src/model";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, TextArea } from "@src/components";
import { BiCheck, BiTrash } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { useAuthenticate } from "@src/domain/account";
import { useUpdateRepository } from "@src/domain/account/update-repository.use-case";

interface RepositoryDescriptionEditProps {
  onSetRepository: (data: Repository) => void;
  onSetEditRepository: (data: boolean) => void;
  nickname: string;
  repository: Repository;
}

const repositoryEditSchema = yup.object().shape({
  title: yup.string().required("Título obrigatório").trim(),
  description: yup.string().trim(),
});

export const RepositoryDescriptionEdit = ({
  onSetRepository,
  onSetEditRepository,
  nickname,
  repository,
}: RepositoryDescriptionEditProps) => {
  const { user } = useAuthenticate();
  const { updateRepository } = useUpdateRepository();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const { register, handleSubmit, formState } = useForm<EditRepositoryForm>({
    resolver: yupResolver(repositoryEditSchema),
  });
  const errors = formState.errors;

  const handleEditRepositoryData: SubmitHandler<EditRepositoryForm> = async (
    credentials
  ) => {
    const repo = await updateRepository({
      id: repository.id,
      userId: user?.id,
      ...credentials,
    });

    onSetRepository(repo);
    onSetEditRepository(false);
  };

  const handleDeleteRepository = () => {};

  return (
    <>
      <VStack
        as="form"
        align="start"
        w="100%"
        spacing={4}
        onSubmit={handleSubmit(handleEditRepositoryData)}
      >
        <HStack spacing={2}>
          <Heading size="md">
            <Icon as={FiBook} />{" "}
            <Link href={`/edu/${nickname}`}>{nickname}</Link>{" "}
          </Heading>
        </HStack>
        <Input
          label="Título"
          value={repository.title}
          error={errors.title}
          {...register("title")}
        />
        <TextArea
          label="Descrição"
          value={repository.description}
          error={errors.description}
          {...register("description")}
        />

        <HStack spacing={4}>
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={formState.isSubmitting}
          >
            <Icon mr="0.5rem" as={BiCheck} /> Salvar
          </Button>

          <Button variant="outline" colorScheme="red" onClick={onOpen}>
            <Icon mr="0.5rem" as={BiTrash} /> Deletar
          </Button>
        </HStack>
      </VStack>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.900" fontSize="lg">
            Deseja mesmo deletar sua conta?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text>
                Todos os seus repositórios, posts e contribuições para a
                comunidade serão deletados, tem certeza que deseja continuar?
              </Text>
              <Button w="100%" colorScheme="teal" onClick={onClose}>
                Não deletar
              </Button>

              <Button
                w="100%"
                variant="outline"
                colorScheme="red"
                onClick={handleDeleteRepository}
              >
                Deletar
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

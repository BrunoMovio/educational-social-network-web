import { Button, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, TextArea } from "@src/components";
import React, { Dispatch, SetStateAction } from "react";
import { CreateRepositoryForm, Repository } from "@src/model";
import { useAuthenticate, useCreateRepository } from "@src/domain/account";

const signInForSchema = yup.object().shape({
  title: yup.string().required("Título obrigatório").trim(),
  description: yup.string().trim(),
});

interface CreateRepositoryComponentProps {
  onSetRepositories: Dispatch<SetStateAction<Repository[]>>;
  onCreationCompleted: () => void;
}

export function CreateRepositoryComponent({
  onSetRepositories,
  onCreationCompleted,
}: CreateRepositoryComponentProps) {
  const { register, handleSubmit, reset, formState } =
    useForm<CreateRepositoryForm>({
      resolver: yupResolver(signInForSchema),
    });

  const { createRepository } = useCreateRepository();
  const { user } = useAuthenticate();

  const errors = formState.errors;

  const handleCreateRepository: SubmitHandler<CreateRepositoryForm> = async (
    credentials
  ) => {
    const newRepository = await createRepository({
      userId: user.id,
      title: credentials.title,
      description: credentials.description,
    });

    onSetRepositories((prev) => [...prev, newRepository]);

    reset();
    onCreationCompleted();
  };

  return (
    <>
      <VStack
        as="form"
        spacing={4}
        onSubmit={handleSubmit(handleCreateRepository)}
      >
        <Input label="Título" error={errors.title} {...register("title")} />
        <TextArea
          label="Descrição"
          error={errors.description}
          {...register("description")}
        />

        <Button
          w="100%"
          type="submit"
          colorScheme="green"
          isLoading={formState.isSubmitting}
        >
          Criar
        </Button>
      </VStack>
    </>
  );
}

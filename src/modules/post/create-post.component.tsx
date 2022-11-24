import { Button, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, TextArea } from "@src/components";
import React, { Dispatch, SetStateAction } from "react";
import { CreatePostForm, Post } from "@src/model";
import { useAuthenticate } from "@src/domain/account";
import { useCreatePost } from "@src/domain/account/create-post.use-case";

const createPostSchema = yup.object().shape({
  title: yup.string().required("Título obrigatório").trim(),
  subtitle: yup.string().required("Subtítulo obrigatório").trim(),
  text: yup.string().required("Texto obrigatório").trim(),
});

interface CreatePostComponentProps {
  onSetPost: Dispatch<SetStateAction<Post[]>>;
  onCreationCompleted: () => void;
  repositoryId: string;
}

export function CreatePostComponent({
  onSetPost,
  onCreationCompleted,
  repositoryId,
}: CreatePostComponentProps) {
  const { register, handleSubmit, reset, formState } = useForm<CreatePostForm>({
    resolver: yupResolver(createPostSchema),
  });
  const errors = formState.errors;

  const { createPost } = useCreatePost();
  const { user } = useAuthenticate();

  const handleCreatePost: SubmitHandler<CreatePostForm> = async (
    credentials
  ) => {
    const newPost = await createPost({
      userId: user.id,
      repositoryId,
      ...credentials,
    });

    onSetPost((prev) => [...prev, newPost]);

    reset();
    onCreationCompleted();
  };

  return (
    <>
      <VStack as="form" spacing={4} onSubmit={handleSubmit(handleCreatePost)}>
        <Input label="Título" error={errors.title} {...register("title")} />
        <Input
          label="Subtítulo"
          error={errors.subtitle}
          {...register("subtitle")}
        />
        <TextArea
          height="500px"
          label="Texto"
          error={errors.text}
          {...register("text")}
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

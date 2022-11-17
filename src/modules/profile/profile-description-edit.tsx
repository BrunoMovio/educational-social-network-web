import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
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
import {
  BiBuildings,
  BiCheck,
  BiDetail,
  BiTrash,
  BiUser,
} from "react-icons/bi";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { useAuthenticate, useUpdateUser } from "@src/domain/account";
import { EditProfileForm, User } from "@src/model";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppStrings } from "@src/strings";
import { Input } from "@src/components";

interface ProfileDescriptionEditProps {
  profile: User;
  editProfile: (state: User) => void;
  onEdit: (state: boolean) => void;
}

const profileStrings = AppStrings.Profile;

const profileEditSchema = yup.object().shape({
  name: yup
    .string()
    .required(profileStrings.profileRequirements.requiredName)
    .trim(),
  description: yup.string().trim(),
  career: yup.string().trim(),
  city: yup.string().trim(),
  state: yup.string().trim(),
  country: yup.string().trim(),
});

export const ProfileDescriptionEdit = ({
  profile,
  editProfile,
  onEdit,
}: ProfileDescriptionEditProps) => {
  const { user } = useAuthenticate();
  const { updateUser } = useUpdateUser();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const { register, handleSubmit, formState } = useForm<EditProfileForm>({
    resolver: yupResolver(profileEditSchema),
  });
  const errors = formState.errors;

  const handleEditUserData: SubmitHandler<EditProfileForm> = async (
    credentials
  ) => {
    const profile = await updateUser({ id: user?.id, ...credentials });

    editProfile(profile);
    onEdit(false);
  };

  const handleDeleteUser = () => {};

  return (
    <>
      <VStack
        py="3rem"
        px="4rem"
        w="100%"
        spacing={4}
        alignItems="left"
        as="form"
        onSubmit={handleSubmit(handleEditUserData)}
      >
        <Avatar size="2xl" mb="1rem" name={profile.name} alignSelf="center" />
        <Box>
          <Input
            variant="flushed"
            placeholder={profileStrings.profilePlaceholder.name}
            icon={BiUser}
            value={profile.name}
            error={errors.name}
            {...register("name")}
          />
          <Text size="md" mt="1rem">
            {profile.nickname}
          </Text>
        </Box>
        <Input
          variant="flushed"
          placeholder={profileStrings.profilePlaceholder.description}
          icon={BiDetail}
          value={profile.description}
          error={errors.description}
          {...register("description")}
        />
        <VStack spacing={1} align="left" fontWeight={600}>
          <Flex align="center">
            <Input
              variant="flushed"
              placeholder={profileStrings.profilePlaceholder.career}
              value={profile.career}
              icon={BiBuildings}
              error={errors.career}
              {...register("career")}
            />
          </Flex>
          <Flex align="center">
            <Input
              variant="flushed"
              placeholder={profileStrings.profilePlaceholder.city}
              value={profile.location.city}
              icon={HiOutlineLocationMarker}
              error={errors.location?.city}
              {...register("location.city")}
            />
          </Flex>
          <Flex align="center">
            <Input
              variant="flushed"
              placeholder={profileStrings.profilePlaceholder.state}
              value={profile.location.state}
              icon={HiOutlineLocationMarker}
              error={errors.location?.state}
              {...register("location.state")}
            />
            <Input
              variant="flushed"
              placeholder={profileStrings.profilePlaceholder.country}
              value={profile.location.country}
              icon={HiOutlineLocationMarker}
              error={errors.location?.country}
              {...register("location.country")}
            />
          </Flex>
          <Flex align="center">
            <Icon mr="0.25rem" as={HiOutlineMail} />
            <Text justifyContent="center">{profile.email}</Text>
          </Flex>
        </VStack>

        {user?.nickname === profile.nickname && (
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
        )}
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
                onClick={handleDeleteUser}
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

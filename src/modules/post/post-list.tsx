import {
  Button,
  Divider,
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Post } from "@src/model";
import React from "react";
import { FiBookmark } from "react-icons/fi";

interface PostListProps {
  posts: Post[];
  onSetShowPost: (data: Post) => void;
}

export const PostList = ({ posts, onSetShowPost }: PostListProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const PostTopic = ({ post }: { post: Post }) => {
    return (
      <Link w="100%" onClick={() => onSetShowPost(post)}>
        <Heading mb="0.25rem" fontSize="2xl" textAlign="start">
          {post.title}
        </Heading>
        <Heading mb="0.5rem" fontSize="sm" textAlign="start">
          {post.subtitle}
        </Heading>
        <Divider />
      </Link>
    );
  };

  return (
    <>
      <VStack spacing={4} align="start">
        <HStack spacing={6}>
          <Heading size="md">Postagens</Heading>
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

        <Divider />
        {posts.map((post) => (
          <PostTopic key={post.id} post={post} />
        ))}
      </VStack>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.900" fontSize="3xl">
            Criar novo post
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>test</ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

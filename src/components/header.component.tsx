import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { useAuthenticate } from "@src/domain/account";

export function Header() {
  const { user, logged } = useAuthenticate();

  return (
    <Flex
      bg="white"
      boxShadow="base"
      pos="sticky"
      top="0"
      as="header"
      zIndex="3"
    >
      <Flex
        maxW="1080px"
        mx="auto"
        h="15vh"
        w="100%"
        align="center"
        justify="space-between"
      >
        <Link href="/dashboard">
          <HStack spacing={0}>
            <Heading fontSize="5xl" fontWeight="600" color="blue.700">
              Edu
            </Heading>
            <Heading fontSize="5xl" fontWeight="600" color="teal.400">
              Share
            </Heading>
          </HStack>
        </Link>

        {logged && (
          <Link href={`/edu/${user?.nickname}`}>
            <HStack spacing="1rem">
              <Box
                textAlign="right"
                pl="1rem"
                borderLeft="1px"
                borderColor="gray.300"
              >
                <Text>{user?.name}</Text>
                <Text color="gray.500" fontSize="small">
                  {user?.email}
                </Text>
              </Box>

              <Avatar size="md" name={user?.name} />
            </HStack>
          </Link>
        )}
      </Flex>
    </Flex>
  );
}

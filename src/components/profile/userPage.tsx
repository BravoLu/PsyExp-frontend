import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Stack,
  Container,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import useUser from "../user/useUser";
import StateIcon from "../utils/stateIcon";

const UserPage = () => {
  const { id } = useParams();
  const { user, setUid } = useUser();

  useEffect(() => {
    if (id !== undefined) {
      setUid(id);
    }
  });

  return (
    <Container maxW="lg" mt="5%" mb="15%">
      <Box
        p={6}
        boxShadow="lg"
        borderWidth="1px"
        borderRadius="md"
        width="100%"
      >
        <Flex align="center">
          <Avatar size="xl" name={user.user_name} />
          <Box ml={4}>
            <HStack>
              <Heading as="h2" size="lg">
                {user.user_name}
              </Heading>
              {user.gender !== undefined && <StateIcon state={user.gender} />}
            </HStack>
            <Text>{user.email}</Text>
          </Box>
        </Flex>

        <Stack mt={4} spacing={4}>
          <Flex justify="space-between">
            <Text fontWeight="bold">Phone Number:</Text>
            <Text>{user.phone_number}</Text>
          </Flex>
        </Stack>

        <Box mt={4}>
          <Heading size="md">Bio</Heading>
          <Textarea
            mt={4}
            value={user.extra}
            disabled={true}
            _disabled={{ color: "black" }}
            height="200px"
          ></Textarea>
        </Box>
      </Box>
    </Container>
  );
};

export default UserPage;

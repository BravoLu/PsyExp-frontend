import {
  Flex,
  Spacer,
  Link as ChakraLink,
  HStack,
  Text,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { Link as ReactRouterLink } from "react-router-dom";
import SearchBar from "./searchBar";
import { useAuth } from "../context";
import UserDrawer from "./drawer";
import { LogoIcon } from "./icons";

const NavBar = () => {
  const { isLogin } = useAuth();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex
      align="center"
      bg="orange.500"
      color="white"
      position="fixed"
      width="100%"
      height="8%"
      zIndex="1"
      top="0"
      flexDirection={{ sm: "column", md: "row", lg: "row" }}
    >
      <HStack>
        <ChakraLink
          as={ReactRouterLink}
          to="/home"
          fontSize="xl"
          fontWeight="bold"
          m={5}
        >
          <HStack>
            <LogoIcon />
            <Text>Brain</Text>
          </HStack>
        </ChakraLink>
        <ChakraLink fontSize="xl" as={ReactRouterLink} to="/experiments">
          <HStack>
            <AiOutlineUser />
            <Text>Experiments</Text>
          </HStack>
        </ChakraLink>
      </HStack>
      <Spacer />
      <HStack
        spacing={{ base: 4, sm: 4, md: 2, lg: 10 }}
        direction={{ base: "column", md: "row" }}
        alignItems={{ base: "stretch", md: "center" }}
      >
        {isLargerThan768 && <SearchBar />}
        {isLogin && <UserDrawer />}
        {!isLogin && (
          <HStack mr={2}>
            <Button
              bgColor="orange.500"
              _hover={{ bg: "orange.700" }}
              as={ReactRouterLink}
              to="/login"
            >
              Sign in
            </Button>
            <Button
              bgColor="orange.500"
              variant="outline"
              _hover={{ bg: "orange.600" }}
              as={ReactRouterLink}
              to="/register"
            >
              Sign up
            </Button>
          </HStack>
        )}
      </HStack>
    </Flex>
  );
};

export default NavBar;

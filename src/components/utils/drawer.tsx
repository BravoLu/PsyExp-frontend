import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  ListItem,
  Button,
  List,
  DrawerFooter,
  Divider,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { Link as ReactRouterLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context";
import useUser from "../user/useUser";
import { useEffect } from "react";
import config from "../../config";

const logout = async () => {
  try {
    const resp = await axios.get(`http://${config.apiUrl}/logout`);
    console.log("logout response: ", resp);
  } catch (error) {
    console.log("logout error: ", error);
  }
};

const UserDrawer = () => {
  const { uid } = useAuth();
  const { user, setUid } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogoutClick = () => {
    logout();
    localStorage.removeItem("uid");
    onClose();
    window.location.href = `/home/`;
  };

  useEffect(() => {
    setUid(uid);
  });

  return (
    <Box mr={4}>
      <ChakraLink as={ReactRouterLink} onClick={onOpen}>
        <Avatar name={user.user_name} />
      </ChakraLink>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            {" "}
            <Flex align="center">
              <Avatar name={user.user_name} />
              <Box ml={4}>
                <Heading as="h2" fontSize={15}>
                  {user.user_name}
                </Heading>
                <Text fontSize={10}>{user.email}</Text>
              </Box>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <List spacing={3} textAlign="center">
              <ListItem>
                <Button
                  width="80%"
                  bgColor="white"
                  leftIcon={AiOutlineUser}
                  as={ReactRouterLink}
                  to="/about"
                  onClick={onClose}
                >
                  Your profile
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  width="80%"
                  bgColor="white"
                  leftIcon={AiOutlineUser}
                  as={ReactRouterLink}
                  to={`/myExp/${localStorage.getItem("uid")}`}
                  onClick={onClose}
                >
                  Your Experiments
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  width="80%"
                  bgColor="white"
                  leftIcon={AiOutlineUser}
                  as={ReactRouterLink}
                  to={`/yourParticipation/${localStorage.getItem("uid")}`}
                  onClick={onClose}
                >
                  Your Participation
                </Button>
              </ListItem>
            </List>
          </DrawerBody>
          <Divider />
          <DrawerFooter>
            <Button
              width="100%"
              bgColor="white"
              alignItems="center"
              as={ReactRouterLink}
              to="/home"
              onClick={handleLogoutClick}
            >
              Sign out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default UserDrawer;

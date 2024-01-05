import { useEffect, useState, useRef } from "react";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Stack,
  Input,
  Textarea,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogContent,
  AlertDialogHeader,
  HStack,
  Grid,
  GridItem,
  Tabs,
  TabList,
  Tab,
  Accordion,
  AccordionItem,
  AccordionButton,
  Spacer,
  AccordionIcon,
  AccordionPanel,
  Circle,
  useToast,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Pagination from "../utils/pagination";
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";
import StateIcon from "../utils/stateIcon";
import { User } from "../user/user";
import useExps from "../experiments/useExp";
import { Link as ReactRouterLink } from "react-router-dom";
import { updateUser, profile } from "./http";

const UserProfile = () => {
  const { exps, totalNum, pageIndex, setPageIndex, setState, stats } =
    useExps();
  const toast = useToast();

  const handleTabClick = (tab: string) => {
    setState(tab);
  };

  const cancelRef = useRef<null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    email: "",
    phone_number: "",
    user_name: "",
    gender: "",
    extra: "",
    state: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isLogin) {
      profile()
        .then((result) => {
          setUser(result);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate("/login");
    }
  }, [isLogin]);

  const handleUpdateSubmit = async () => {
    updateUser({
      extra: user.extra,
      phone_number: user.phone_number,
    })
      .then(() => {
        toast({
          title: "Update Success.",
          description: "Your Profile has been updated",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setUser(user);
      })
      .catch((error) => {
        toast({
          title: "Update Failed.",
          description: error,
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
    onClose();
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(1, 1fr)" minH="800px">
      <GridItem rowSpan={1} colSpan={1}>
        <Card mt={20}>
          <CardBody>
            <form onSubmit={handleUpdateSubmit}>
              <Flex align="center">
                <Avatar size="xl" name={user.user_name} />
                <Box ml={4}>
                  <HStack>
                    <Heading as="h2" size="lg">
                      {user.user_name}
                    </Heading>
                    {user.gender !== undefined && (
                      <StateIcon state={user.gender} />
                    )}
                  </HStack>
                  <Text>{user.email}</Text>
                </Box>
              </Flex>
              <Stack spacing={4}>
                <FormControl id="phone_number" mt={4}>
                  <HStack>
                    <FormLabel>Phone:</FormLabel>
                    <Input
                      type="text"
                      name="phone_number"
                      width="auto"
                      value={user.phone_number}
                      onChange={handleInputChange}
                    />
                  </HStack>
                </FormControl>

                <FormControl id="extra" mb={4}>
                  <FormLabel>Bio:</FormLabel>
                  <Textarea
                    height="200px"
                    onChange={handleInputChange}
                    value={user.extra}
                  />
                </FormControl>
              </Stack>
            </form>
          </CardBody>
          <CardFooter>
            <ButtonGroup
              variant="outline"
              spacing="6"
              justifyContent="center"
              width="100%"
            >
              <Button colorScheme="orange" variant="outline" onClick={onOpen}>
                Update
              </Button>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onOpen}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Update Your Profile ?
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="orange"
                        onClick={handleUpdateSubmit}
                        ml={3}
                      >
                        Confirm
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Card m={4} mt={20}>
          <Tabs>
            <TabList>
              <Tab onClick={() => handleTabClick("0")}>
                <StateIcon state="STATE_SUB_INVALID" />
                All
                <HStack>
                  <Circle bg="gray.200" size="30px" ml={2}>
                    <Text color="black">{stats.all_num}</Text>
                  </Circle>
                </HStack>
              </Tab>
              <Tab onClick={() => handleTabClick("1")}>
                <StateIcon state="STATE_EXP_PUBLISHED" />
                Running
                <HStack>
                  <Circle bg="gray.200" size="30px" ml={2}>
                    <Text color="black">{stats.ongoing_num}</Text>
                  </Circle>
                </HStack>
              </Tab>
              <Tab onClick={() => handleTabClick("2")}>
                <StateIcon state="STATE_EXP_FINISHED" />
                Finished
                <HStack>
                  <Circle bg="gray.200" size="30px" ml={2}>
                    <Text color="black">{stats.finished_num}</Text>
                  </Circle>
                </HStack>
              </Tab>
              <Tab onClick={() => handleTabClick("3")}>
                <StateIcon state="STATE_EXP_DELETED" />
                Closed
                <HStack>
                  <Circle bg="gray.200" size="30px" ml={2}>
                    <Text color="black">{stats.closed_num}</Text>
                  </Circle>
                </HStack>
              </Tab>
            </TabList>
          </Tabs>
          <Accordion>
            {exps !== undefined &&
              exps !== null &&
              exps.map((v, k) => (
                <AccordionItem key={k}>
                  <h2>
                    <AccordionButton>
                      {/* <HStack> */}
                      <Box as="span" flex="1" textAlign="left">
                        <StateIcon state={v.state} />
                        {v.title}
                      </Box>
                      {/* </HStack> */}
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text noOfLines={4}>{v.desc}</Text>
                    <Flex m={4}>
                      <Spacer />
                      <Button
                        rightIcon={<ArrowForwardIcon />}
                        colorScheme="orange"
                        // variant="outline"
                        as={ReactRouterLink}
                        to={`/detail/${v.eid}`}
                      >
                        Go to
                      </Button>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              ))}
          </Accordion>
          <Pagination
            currentPage={pageIndex}
            totalPages={totalNum % 10 == 0 ? totalNum / 10 : totalNum / 10 + 1}
            onPageChange={setPageIndex}
          />
        </Card>
      </GridItem>
    </Grid>
  );
};

export default UserProfile;

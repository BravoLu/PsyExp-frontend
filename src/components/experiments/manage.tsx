import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  CardBody,
  CardFooter,
  Box,
  Heading,
  Text,
  Button,
  Link,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Badge,
  ButtonGroup,
} from "@chakra-ui/react";
import useUser, { useUsers } from "../user/useUser";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { useExp } from "./entity";
import StateIcon from "../utils/stateIcon";
import { updateSub, queryExp } from "./http";
import { IoNuclearOutline } from "react-icons/io5";

const ManageExperiment = () => {
  const { exp, setExp } = useExp();
  const {
    isOpen: isApproveOpen,
    onOpen: onApproveOpen,
    onClose: onApproveClose,
  } = useDisclosure();
  const {
    isOpen: isRejectOpen,
    onOpen: onRejectOpen,
    onClose: onRejectClose,
  } = useDisclosure();

  const cancelApproveRef = useRef<null>(null);
  const cancelRejectRef = useRef<null>(IoNuclearOutline);

  const { user, setUid } = useUser();

  const { users, setUids } = useUsers();

  const [rerender, setRerender] = useState(false);

  const [selectedId, setSelectedId] = useState("");

  const toast = useToast();

  const handleApprove = () => {
    updateSub(selectedId, 2)
      .then(() => {
        toast({
          title: "Approve Successfully.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setRerender((prev) => !prev);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Approve Failed.",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
    onApproveClose();
  };

  const handleReject = () => {
    updateSub(selectedId, 3)
      .then(() => {
        toast({
          title: "Reject Successfully.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setRerender((prev) => !prev);
      })
      .catch((error) => {
        toast({
          title: "Reject Failed.",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        console.error(error);
      });
    onRejectClose();
  };

  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      queryExp(id)
        .then((result) => {
          setExp((prev) => {
            const updatedExp = {
              ...prev,
              ...result.exp,
              subs: result.subs,
              subs_num: result.subs_num,
              finished_num: result.finished_num,
            };
            setUid(String(updatedExp.rid));
            return updatedExp;
          });
          setUids(result.subs.map((item) => Number(item.pid)));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, rerender]);

  return (
    <Box mt={20} mb={20} minH="1200px">
      <Button
        variant="outline"
        colorScheme="orange"
        m={2}
        as={ReactRouterLink}
        to={`/myExp/${localStorage.getItem("uid")}`}
      >
        Back
      </Button>
      <Card m={5}>
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={user.user_name} />
              <Box>
                <Heading size="sm">{user.user_name}</Heading>
                <Text>{user.email}</Text>
              </Box>
            </Flex>
            <HStack>
              <Text>Registration/Target: </Text>
              {exp.subs_num !== undefined && exp.pnum !== undefined && (
                <CircularProgress
                  value={(exp.subs_num / exp.pnum) * 100}
                  color="green.400"
                >
                  <CircularProgressLabel>{`${exp.subs_num} / ${exp.pnum}`}</CircularProgressLabel>
                </CircularProgress>
              )}
            </HStack>
            <HStack ml={5}>
              <Text>Finished/Target: </Text>
              {exp.finished_num !== undefined && exp.pnum !== undefined && (
                <CircularProgress
                  value={(exp.finished_num / exp.pnum) * 100}
                  color="green.400"
                >
                  <CircularProgressLabel>{`${exp.finished_num} / ${exp.pnum}`}</CircularProgressLabel>
                </CircularProgress>
              )}
            </HStack>
          </Flex>
          <Heading mt={3}>{exp.title}</Heading>
          {exp.tags !== undefined && (
            <Box alignItems="baseline" minH="20px">
              {exp.tags.map((t) => (
                <Badge borderRadius="full" px="2" colorScheme="orange" key={t}>
                  {t}
                </Badge>
              ))}
            </Box>
          )}
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>user</Th>
                  <Th>state</Th>
                  <Th>created_at</Th>
                  <Th>action</Th>
                </Tr>
              </Thead>
              {exp.subs !== null &&
                exp.subs !== undefined &&
                exp.subs.map((v, k) => (
                  <Tr key={k}>
                    <Th>{v.sid}</Th>
                    <Td>
                      <Link href={`/user/${v.pid}`}>
                        {users.get(v.pid) !== undefined && (
                          <HStack>
                            <Avatar name={users.get(v.pid).user_name} />
                            <Text>{users.get(v.pid).email}</Text>
                          </HStack>
                        )}
                      </Link>
                    </Td>
                    <Th>
                      {v.state !== undefined && <StateIcon state={v.state} />}
                    </Th>
                    <Th>{v.create_time}</Th>
                    <Th>
                      <ButtonGroup>
                        <Button
                          colorScheme="green"
                          isDisabled={v.state !== "Init"}
                          _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                          onClick={() => {
                            onApproveOpen();
                            if (v.sid !== undefined) {
                              setSelectedId(v.sid);
                            }
                          }}
                        >
                          Approve
                        </Button>
                        <AlertDialog
                          isOpen={isApproveOpen}
                          leastDestructiveRef={cancelApproveRef}
                          onClose={onApproveClose}
                        >
                          <AlertDialogOverlay>
                            <AlertDialogContent>
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
                                {`Approve "${selectedId}" ?`}
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <Button
                                  ref={cancelApproveRef}
                                  onClick={onApproveClose}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  value={v.sid}
                                  colorScheme="orange"
                                  onClick={() => {
                                    handleApprove();
                                  }}
                                  ml={3}
                                >
                                  Confirm
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialogOverlay>
                        </AlertDialog>

                        <Button
                          colorScheme="red"
                          isDisabled={v.state !== "Init"}
                          _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                          onClick={() => {
                            onRejectOpen();
                            if (v.sid !== undefined) {
                              setSelectedId(v.sid);
                            }
                          }}
                        >
                          {" "}
                          Reject{" "}
                        </Button>
                        <AlertDialog
                          isOpen={isRejectOpen}
                          leastDestructiveRef={cancelRejectRef}
                          onClose={onRejectOpen}
                        >
                          <AlertDialogOverlay>
                            <AlertDialogContent>
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
                                {`Reject "${selectedId}" ?`}
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <Button
                                  ref={cancelRejectRef}
                                  onClick={onRejectClose}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  value={v.sid}
                                  colorScheme="orange"
                                  onClick={() => {
                                    handleReject();
                                  }}
                                  ml={3}
                                >
                                  Confirm
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialogOverlay>
                        </AlertDialog>
                      </ButtonGroup>
                    </Th>
                  </Tr>
                ))}
            </Table>
          </TableContainer>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </Box>
  );
};

export default ManageExperiment;

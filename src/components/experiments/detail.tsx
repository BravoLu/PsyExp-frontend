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
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Divider,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Badge,
} from "@chakra-ui/react";
import useUser from "../user/useUser";
import { AddIcon, CheckIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { useExp } from "./entity";
import { querySub, addSub, queryExp } from "./http";

const ExpDetail = () => {
  const { exp, setExp } = useExp();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<null>(null);
  const [joined, setJoined] = useState(false);
  const { user, setUid } = useUser();

  const [rerender, setRerender] = useState(false);

  const toast = useToast();
  const { id } = useParams();

  const handleJoinClick = () => {
    // call http
    if (id !== undefined) {
      addSub(id)
        .then(() => {
          setRerender((prev) => !prev);
          toast({
            title: "Join Successfully.",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: "Join Failed.",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        });
    }
    onClose();
  };

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
            };
            setUid(String(updatedExp.rid));
            return updatedExp;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
    querySub({ eid: Number(id) })
      .then((rsp) => {
        if (rsp.code === 0) {
          setJoined(true);
        } else {
          setJoined(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, rerender, joined]);

  return (
    <Box mt={20} mb={20} minH="810px">
      <Button
        variant="outline"
        colorScheme="orange"
        m={2}
        as={ReactRouterLink}
        to="/experiments"
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
              <Text>Process: </Text>
              {exp.subs_num !== undefined && exp.pnum !== undefined && (
                <CircularProgress
                  value={(exp.subs_num / exp.pnum) * 100}
                  color="green.400"
                >
                  <CircularProgressLabel>{`${exp.subs_num} / ${exp.pnum}`}</CircularProgressLabel>
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
          <Text>{exp.desc}</Text>

          <Divider mt={4} />
          <HStack mt={4}>
            <Text>Time:</Text>
            <Text>{exp.ctime} mins</Text>
          </HStack>
          <HStack mt={2}>
            <Text>fee: </Text>
            <Text>$ {exp.price} </Text>
          </HStack>
          <HStack mt={4}>
            <Text>Deadline: </Text>
            <Text>{exp.deadline !== undefined && exp.deadline.toString()}</Text>
          </HStack>
          {/* <Text>hello</Text> */}
        </CardBody>
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          {!joined && (
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<AddIcon />}
              onClick={onOpen}
            >
              Join
            </Button>
          )}
          {joined && (
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<CheckIcon />}
              isDisabled={true}
            >
              Joined
            </Button>
          )}
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Join "{exp.title}" ?
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="orange" onClick={handleJoinClick} ml={3}>
                    Join
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          <Button
            flex="1"
            variant="ghost"
            leftIcon={<ExternalLinkIcon />}
            as={ReactRouterLink}
            to={`http://${exp.url}`}
          >
            Go to
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default ExpDetail;

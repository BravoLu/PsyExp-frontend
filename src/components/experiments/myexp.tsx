import {
  Grid,
  GridItem,
  Card,
  Flex,
  Box,
  Text,
  IconButton,
  HStack,
  Button,
  Spacer,
  CardHeader,
  CardBody,
  CardFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  List,
  ListItem,
  SimpleGrid,
  Select,
  useDisclosure,
  Divider,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  HamburgerIcon,
  EditIcon,
  DeleteIcon,
  CloseIcon,
  SettingsIcon,
  BellIcon,
} from "@chakra-ui/icons";
import SearchBar from "../utils/searchBar";
import Pagination from "../utils/pagination";
import useExps from "./useExp";
import useUser from "../user/useUser";
import { useEffect, useState } from "react";
import { getExpStatusColor } from "../utils/utils";
import CustomAlertDialog from "../utils/alertDialog";
import { updateExp } from "./http";

const MyExp = () => {
  const {
    exps,
    totalNum,
    rid,
    pageIndex,
    state,
    rerender,
    setRerender,
    setPageIndex,
    setState,
  } = useExps();

  const { setUid } = useUser();

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    setUid(String(rid));
  }, [exps, rerender]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };

  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
    isOpen: isDeleteOpen,
  } = useDisclosure();
  const {
    onOpen: onCloseOpen,
    onClose: onCloseClose,
    isOpen: isCloseOpen,
  } = useDisclosure();

  const handlePublishClick = async () => {
    try {
      await updateExp({ eid: selectedId, state: 2 });
      setRerender(!rerender);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await updateExp({ eid: selectedId, state: 0 });
      setRerender(!rerender);
      onDeleteClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseClick = async () => {
    try {
      await updateExp({ eid: selectedId, state: 4 });
      setRerender(!rerender);
      onCloseClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box mt={{ base: 20, lg: 10 }} minH="810px">
      <Grid
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(1, 12, 1fr)"
        gap={1}
      >
        <GridItem colSpan={1} rowSpan={12}>
          <Box m={8}>
            <Text as="b">Experiment Management</Text>
            <List m={2}>
              <ListItem>All</ListItem>
            </List>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={4} p={10}>
          <SimpleGrid columns={4} spacing={10}>
            <HStack>
              <Text>Status:</Text>
              <Select
                placeholder="All"
                value={state}
                onChange={handleSelectChange}
              >
                <option value="1">Draft</option>
                <option value="2">Published</option>
                <option value="3">Finished</option>
                <option value="4">Closed</option>
              </Select>
            </HStack>
            {isLargerThan768 && (
              <HStack>
                <Text>Title:</Text>
                <SearchBar />
              </HStack>
            )}
            {!isLargerThan768 && <HStack></HStack>}
            <HStack></HStack>
            <Flex>
              <Spacer />
              <Button
                variant="outline"
                colorScheme="orange"
                leftIcon={<EditIcon />}
                as={ReactRouterLink}
                to="/newExp"
              >
                {isLargerThan768 && "New"}
              </Button>
            </Flex>
          </SimpleGrid>
        </GridItem>
        {exps !== undefined &&
          exps !== null &&
          exps.map((v, k) => (
            <GridItem colSpan={4} rowSpan={1} key={k}>
              <Card>
                <CardHeader>
                  <Flex>
                    <Spacer />
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<HamburgerIcon />}
                        variant="subtle"
                        onClick={() => {
                          setSelectedId(String(v.eid));
                        }}
                      />
                      <MenuList>
                        <MenuItem
                          icon={<EditIcon />}
                          as={ReactRouterLink}
                          to={`/edit/${v.eid}`}
                        >
                          Update
                        </MenuItem>
                        <MenuItem
                          icon={<SettingsIcon />}
                          as={ReactRouterLink}
                          to={`/manage/${v.eid}`}
                        >
                          Management
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          icon={<BellIcon />}
                          onClick={onOpen}
                          isDisabled={
                            v.state === "Published" || v.state === "Closed"
                          }
                        >
                          Publish
                        </MenuItem>
                        <CustomAlertDialog
                          isOpen={isOpen}
                          onOpen={onOpen}
                          onClose={onClose}
                          onClick={handlePublishClick}
                          Text="Publish this experiment?"
                        />
                        <MenuItem icon={<CloseIcon />} onClick={onCloseOpen}>
                          Close
                        </MenuItem>
                        <CustomAlertDialog
                          isOpen={isCloseOpen}
                          onOpen={onCloseOpen}
                          onClose={onCloseClose}
                          onClick={handleCloseClick}
                          Text="Delete this experiment?"
                        />
                        <MenuItem icon={<DeleteIcon />} onClick={onDeleteOpen}>
                          Delete
                        </MenuItem>
                        <CustomAlertDialog
                          isOpen={isDeleteOpen}
                          onOpen={onDeleteOpen}
                          onClose={onDeleteClose}
                          onClick={handleDeleteClick}
                          Text="Delete this experiment?"
                        />
                      </MenuList>
                    </Menu>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Grid
                    templateColumns="repeat(7, 1fr)"
                    templateRows="repeat(1, 1fr)"
                  >
                    <GridItem colSpan={4} rowSpan={1}>
                      <Text as="b">{v.title}</Text>
                      {v.tags !== undefined && (
                        <Box alignItems="baseline" minH="20px">
                          {v.tags.map((t) => (
                            <Badge
                              borderRadius="full"
                              px="2"
                              colorScheme="green"
                              key={t}
                              m={1}
                            >
                              {t}
                            </Badge>
                          ))}
                        </Box>
                      )}
                    </GridItem>
                    <GridItem colSpan={1} rowSpan={1}>
                      <Spacer />
                    </GridItem>
                    <GridItem colSpan={1} rowSpan={1}></GridItem>
                    <GridItem colSpan={1} rowSpan={1}>
                      <Badge
                        borderRadius="full"
                        textAlign="center"
                        colorScheme={getExpStatusColor(v.state)}
                      >
                        {v.state}
                      </Badge>
                    </GridItem>
                    {/* </Flex> */}
                  </Grid>
                </CardBody>
                <CardFooter>
                  <Flex>
                    <Text color="gray"> Last Updated: {v.update_time} </Text>
                    <Text pl={4} color="gray">
                      {" "}
                      Deadline:{" "}
                      {v.deadline !== undefined && v.deadline.toString()}{" "}
                    </Text>
                  </Flex>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        <GridItem rowSpan={1} colSpan={4}>
          <Pagination
            currentPage={pageIndex}
            totalPages={totalNum % 10 == 0 ? totalNum / 10 : totalNum / 10 + 1}
            onPageChange={setPageIndex}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MyExp;

import {
  SimpleGrid,
  GridItem,
  Box,
  Button,
  Flex,
  Spacer,
  Card,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
  Grid,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import ExpCard from "./cards";
import useExps from "./useExp";
import ExpSkeleton from "./skeleton";
import Pagination from "../utils/pagination";
import CustomMenu from "../utils/menu";

const Experiments = () => {
  const {
    isLoading,
    exps,
    totalNum,
    pageIndex,

    stats,

    setPageIndex,

    setOrder,

    setState,
  } = useExps();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const sortMenu = {
    title: "sort",
    options: [
      {
        desc: "Update Latest",
        handleClick: () => {
          setOrder(0);
        },
      },
      {
        desc: "Most Fee",
        handleClick: () => {
          setOrder(1);
        },
      },
    ],
  };

  const selectState = {
    title: "state",
    options: [
      {
        desc: "All",
        handleClick: () => {
          setState("0");
        },
      },
      {
        desc: "Running",
        handleClick: () => {
          setState("1");
        },
      },
      {
        desc: "Finished",
        handleClick: () => {
          setState("2");
        },
      },
      {
        desc: "Closed",
        handleClick: () => {
          setState("3");
        },
      },
    ],
  };

  return (
    <Box m={{ base: 10, sm: 5, md: 10, lg: 20 }}>
      {/* <Dirs />  */}
      <Flex mb={5}>
        <Card width="100%">
          <CardBody>
            <Grid
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(5, 1fr)"
            >
              <GridItem rowSpan={1} colSpan={4}>
                <Heading>Dashboard</Heading>
                {/* <Text>Dashboard</Text> */}
              </GridItem>
              <GridItem rowSpan={2} colSpan={1}>
                <CircularProgress
                  value={(stats.finished_num / stats.all_num) * 100}
                  color="green.400"
                  // size=""
                  size="xs"
                >
                  <CircularProgressLabel fontSize="lg">{`${stats.finished_num} / ${stats.all_num}`}</CircularProgressLabel>
                </CircularProgress>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Stat>
                  <StatLabel>All:</StatLabel>
                  <StatNumber>{stats.all_num}</StatNumber>
                </Stat>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Stat>
                  <StatLabel>Running:</StatLabel>
                  <StatNumber>{stats.ongoing_num}</StatNumber>
                </Stat>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Stat>
                  <StatLabel>Finished:</StatLabel>
                  <StatNumber>{stats.finished_num}</StatNumber>
                </Stat>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Stat>
                  <StatLabel>Closed:</StatLabel>
                  <StatNumber>{stats.closed_num}</StatNumber>
                </Stat>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
        <Spacer />
      </Flex>
      <Flex mb={4}>
        <CustomMenu {...selectState} />
        <Spacer />

        <CustomMenu {...sortMenu} />

        <Button
          variant="outline"
          colorScheme="orange"
          leftIcon={<EditIcon />}
          as={ReactRouterLink}
          to="/newExp"
        >
          New
        </Button>
      </Flex>

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 5 }}
        gap={4}
        alignItems="center"
        minH="300px"
      >
        {isLoading &&
          skeletons.map((skeleton) => <ExpSkeleton key={skeleton} />)}
        {exps !== undefined &&
          exps != null &&
          Object.values(exps).map((v, k) => (
            <GridItem w="100%" h="100%" bg="white.500" key={k}>
              <ExpCard {...v} />
            </GridItem>
          ))}
      </SimpleGrid>

      <Pagination
        currentPage={pageIndex}
        totalPages={totalNum % 10 == 0 ? totalNum / 10 : totalNum / 10 + 1}
        onPageChange={setPageIndex}
      />
    </Box>
  );
};

export default Experiments;

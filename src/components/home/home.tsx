import {
  SimpleGrid,
  Image,
  Center,
  Text,
  VStack,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";

const Home = () => {
  return (
    <SimpleGrid columns={{base: 1, sm: 1, md: 2, lg: 2}}>
      <Center m={20}>
        <VStack>
          <Text fontSize="6xl" as="b">
            Join
          </Text>
          <Text fontSize="6xl" color="orange" as="b">
            Experiments
          </Text>
          <Text fontSize="6xl" as="b">
            Get Paid
          </Text>
          <ButtonGroup spacing={5}>
            <Button
              variant="outline"
              colorScheme="orange"
              as={ReactRouterLink}
              to="/newExp"
              fontSize="2xl"
              width="100%"
              height="60px"
              rightIcon={<ArrowForwardIcon />}
            >
              Publish
            </Button>
            <Button
              variant="solid"
              colorScheme="orange"
              as={ReactRouterLink}
              to="/experiments"
              fontSize="2xl"
              width="100%"
              height="60px"
              rightIcon={<ArrowForwardIcon />}
            >
              Join
            </Button>
          </ButtonGroup>
        </VStack>
      </Center>
      <Center>
        <Image src="/homepage.jpeg" height="100%"></Image>
      </Center>
    </SimpleGrid>
  );
};

export default Home;

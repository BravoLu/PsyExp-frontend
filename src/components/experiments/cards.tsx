import {
  Box,
  Image,
  Badge,
  Button,
  Stack,
  Text,
  Heading,
  HStack,
  Flex,
  Spacer,
  Divider,
  Stat,
  StatNumber,
  StatLabel,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { getTimeGap } from "../utils/utils";
import { ExpInfo } from "./entity";
import StateIcon from "../utils/stateIcon";

const ExpCard = (props: ExpInfo) => {
  const imageUrl = `default.png`;
  return (
    <Card width="100%" height="100%">
      <CardBody>
        <Image
          src={imageUrl}
          borderRadius="lg"
          width="100%"
          height="40%"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/default.png";
          }}
          fallbackSrc="/default.png"
        />
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
          mt="5"
        >
          {props.update_time !== undefined && getTimeGap(props.update_time)}
        </Box>
        {props.tags !== undefined && (
          <Box alignItems="baseline" minH="20px">
            {props.tags.map((t) => (
              <Badge borderRadius="full" px="2" colorScheme="orange" key={t}>
                {t}
              </Badge>
            ))}
          </Box>
        )}
        <Stack mt="6" spacing="2">
          <HStack>
            <StateIcon state={props.state} />
            <Heading size="sm" noOfLines={1}>
              {props.title}
            </Heading>
          </HStack>

          <Flex alignItems="center">
            <Box as="span" color="gray.600" fontSize="sm">
              <Stat>
                <StatLabel textAlign="center">Need</StatLabel>
                <StatNumber>{props.pnum} </StatNumber>
              </Stat>
            </Box>
            <Spacer />
            <Box as="span" color="gray.600" fontSize="sm">
              <Stat>
                <StatLabel textAlign="center">fee</StatLabel>
                <StatNumber>💲{props.price} </StatNumber>
              </Stat>
            </Box>
            <Spacer />
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              <Stat>
                <StatLabel textAlign="center">Time</StatLabel>
                <HStack>
                  <StatNumber>{props.ctime} </StatNumber>
                  <Text>mins </Text>
                </HStack>
              </Stat>
            </Box>
            {/* <Spacer /> */}
          </Flex>
        </Stack>
      </CardBody>
      <Divider color="gray.100" />
      <CardFooter justifyContent="center">
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="orange"
          variant="outline"
          as={ReactRouterLink}
          to={`/detail/${props.eid}`}
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExpCard;

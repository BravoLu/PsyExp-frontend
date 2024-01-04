import {
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Failure = () => {
  return (
    <Center m={20} minH="550px">
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Register Failed!
        </AlertTitle>
        <AlertDescription maxWidth="sm"></AlertDescription>
      </Alert>
    </Center>
  );
};

export default Failure;

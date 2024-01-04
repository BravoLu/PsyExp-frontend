import {
  Center,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Success = () => {
  return (
    <Center m={20} minH="550px">
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
            Register Success!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
           Click{" "}
          <Link color="blue" href="http://localhost:5173/login">
            here
          </Link>{" "}
          to login.{" "}
        </AlertDescription>
      </Alert>
    </Center>
  );
};

export default Success;

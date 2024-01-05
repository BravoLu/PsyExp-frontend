import {
  Center,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import config from "../../config";

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
          <Link color="blue" href={`http://${config.apiUrl}/login`}>
            here
          </Link>{" "}
          to login.{" "}
        </AlertDescription>
      </Alert>
    </Center>
  );
};

export default Success;

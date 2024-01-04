import {
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const ResetRequest = () => {
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
          Email Sent!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Check your email for password reset instructions.
        </AlertDescription>
      </Alert>
    </Center>
  );
};

export default ResetRequest;

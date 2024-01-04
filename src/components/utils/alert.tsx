import {
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export interface Props {
  title: string;
  desc: string;
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}

const AlertResult = (props: Props) => {
  return (
    <Center m={20} minH="550px">
      <Alert
        status={props.status}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="400px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {props.title}
        </AlertTitle>
        <AlertDescription maxWidth="sm">{props.desc}</AlertDescription>
      </Alert>
    </Center>
  );
};

export default AlertResult;

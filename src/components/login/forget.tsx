import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Card,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { precheck } from "../utils/utils";
import config from "../../config";

const resetPassword = async (email: string, uid: number) => {
  return new Promise((resolve, reject) => {
    try {
      const data = {
        email: email,
        uid: uid,
      };
      const rsp = axios.post(`http://${config.apiUrl}/forget`, data, {
        withCredentials: true,
      });
      resolve(rsp);
    } catch (error) {
      reject(error);
    }
  });
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    precheck(email).then((rsp) => {
      if (rsp.code === 0) {
        setUid(Number(rsp.uid));
        resetPassword(email, Number(rsp.uid));
      } else {
        setUid(-1);
      }
      setIsLoading(false);
      window.location.href = "/resetsuccess";
    });
  };

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      shadow="lg"
    >
      <VStack spacing={5} align="center" width="100%" p={3}>
        <Heading mb={6}>Forgot Password</Heading>
        <Card
          p={5}
          width={{base: "80%", lg: "30%"}}
          height={{base: "80%", lg: "50%"}}
          alignItems="center"
          bgColor="gray.100"
        >
          <form onSubmit={handleSubmit}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                w="100%"
                type="email"
                placeholder="Enter your email"
                value={email}
                backgroundColor="white"
                onChange={(e) => setEmail(e.target.value)}
                // onBlur={handleEmailPrecheck}
                required
              />
            </FormControl>
            {uid === -1 && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                Email hasn't been registered.
              </Alert>
            )}
            <Button
              isLoading={isLoading}
              type="submit"
              colorScheme="orange"
              variant="solid"
              width="100%"
            >
              Reset Password
            </Button>
          </form>
        </Card>
      </VStack>
    </Box>
  );
};

export default ForgotPassword;

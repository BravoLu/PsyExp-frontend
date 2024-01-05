import { useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  HStack,
  ButtonGroup,
  Text,
  Alert,
  AlertIcon,
  Card,
  VStack,
} from "@chakra-ui/react";
import { checkPasswordStrength, getProgressBarColor } from "../utils/utils";
import config from "../../config";

const resetPassword = async (token: string, password: string) => {
  return new Promise((resolve, reject) => {
    try {
      const rsp = axios.post(
        `http://${config.apiUrl}/reset/${token}`,
        { password: password },
        { withCredentials: true }
      );
      resolve(rsp);
    } catch (error) {
      reject(error);
    }
  });
};

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const token = new URLSearchParams(location.search).get("token");

  const [strength, setStrength] = useState<number>(0);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newStrength = checkPasswordStrength(value);
    setStrength(newStrength);
    setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token !== null) {
      resetPassword(token, password)
        .then(() => {})
        .catch();
      window.location.href = "/resetPasswordsuccess";
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const handleBlur = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
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
      <VStack>
        <Heading mb={6}>Reset Password</Heading>
        <Card
          p={5}
          width="100%"
          height="50%"
          alignItems="center"
          bgColor="gray.100"
        >
          <form onSubmit={handleSubmit}>
            <FormControl id="password" mb={6}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your new password"
                onChange={handlePasswordChange}
                bgColor="white"
                required
              />
              {strength >= 1 && (
                <HStack mt={2}>
                  <Text fontSize="sm">Password Strength: </Text>
                  <ButtonGroup spacing={1}>
                    {strength >= 1 && (
                      <Button
                        bgColor={getProgressBarColor(strength)}
                        size="xs"
                        maxH="3px"
                        disabled={true}
                      />
                    )}
                    {strength >= 2 && (
                      <Button
                        bgColor={getProgressBarColor(strength)}
                        size="xs"
                        maxH="3px"
                        disabled={true}
                      />
                    )}
                    {strength >= 3 && (
                      <Button
                        bgColor={getProgressBarColor(strength)}
                        size="xs"
                        maxH="3px"
                        disabled={true}
                      />
                    )}
                  </ButtonGroup>
                </HStack>
              )}
            </FormControl>
            <FormControl id="confirmPassword" mb={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your new password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={handleBlur}
                bgColor="white"
                required
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="orange"
              variant="solid"
              width="full"
            >
              Reset Password
            </Button>

            {passwordMatchError && (
              <Alert status="error" mb={4} mt={2}>
                <AlertIcon />
                Entered passwords differ
              </Alert>
            )}
          </form>
        </Card>
      </VStack>
    </Box>
  );
};

export default ResetPassword;

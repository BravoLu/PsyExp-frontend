import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Radio,
  RadioGroup,
  Alert,
  AlertIcon,
  HStack,
  Text,
  Link,
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { CgArrowRight } from "react-icons/cg";
import { register, RegisterReq } from "../profile/http";
import { precheck } from "../utils/utils";

const Registration = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [emailRegistered, setEmailRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterReq>({
    user_info: {
      email: "",
      phone_number: "",
      user_name: "",
      gender: "3",
    },
    password: "",
  });

  const [strength, setStrength] = useState<number>(0);

  const getProgressBarColor = (): string => {
    switch (strength) {
      case 1:
        return "red.400";
      case 2:
        return "orange.400";
      case 3:
        return "green.400";
      default:
        return "gray.300";
    }
  };

  const checkPasswordStrength = (password: string): number => {
    // Implement your password strength logic here
    // Example: Check for minimum length and the presence of numbers and special characters
    if (password.length === 0) {
      return 0;
    }
    if (password.length < 8) {
      return 1;
    }

    if (/^(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
      return 3;
    }

    return 2;
  };

  const handleEmailPrecheck = async () => {
    if (formData.user_info.email !== undefined) {
      precheck(formData.user_info.email).then((rsp) => {
        if (rsp.code === 0 && rsp.uid !== "-1") {
          setEmailRegistered(true);
        } else {
          setEmailRegistered(false);
        }
      });
    }
  };

  const handleBlur = () => {
    if (formData.password !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const handleRadioChange = (value: string) => {
    // Update the formData state for the radio button
    setFormData((prevData) => ({
      ...prevData,
      user_info: {
        ...prevData.user_info,
        gender: value,
      },
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "password") {
      const newStrength = checkPasswordStrength(value);
      setStrength(newStrength);
    }
    setFormData((prevData) => ({
      ...prevData,
      user_info: {
        ...prevData.user_info,
        [name]: value,
      },
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    register(formData).then(() => {
      window.location.href = "/registerSendEmailSuccess"
    }).catch(() => {
      window.location.href = "/registerSendEmailFailed"
    });
    setIsLoading(false);
  };

  return (
    <Container centerContent mb="5%">
      <Heading mt={20} textAlign="center">
        Register
      </Heading>
      <HStack fontSize={12} mt={2}>
        <Text>Already have an account?</Text>
        <Link as={ReactRouterLink} to="/login">
          <HStack>
            <Text color="blue.500">Sign in</Text>
            <CgArrowRight />
          </HStack>
        </Link>
      </HStack>
      <Box
        mt={5}
        p={8}
        maxW="md"
        width="100%"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bgColor="gray.100"
      >
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.user_info.email}
              onChange={handleChange}
              onBlur={handleEmailPrecheck}
              bgColor="white"
              tabIndex={1}
            />
          </FormControl>
          {emailRegistered && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              Email has been registered.
            </Alert>
          )}
          <FormControl id="user_name" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="user_name"
              value={formData.user_info.user_name}
              onChange={handleChange}
              bgColor="white"
              tabIndex={2}
            />
          </FormControl>
          <FormControl id="gender" mb={4}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              onChange={handleRadioChange}
              value={formData.user_info.gender}
              tabIndex={3}
            >
              <Stack direction="row">
                <Radio value="1" bgColor="white">
                  Male
                </Radio>
                <Radio value="2" bgColor="white">
                  Female
                </Radio>
                <Radio value="3" bgColor="white">
                  Unknown
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              bgColor="white"
              tabIndex={4}
            />
            {strength >= 1 && (
              <HStack mt={2}>
                <Text fontSize="sm">Password Strength: </Text>
                <ButtonGroup spacing={1}>
                  {strength >= 1 && (
                    <Button
                      bgColor={getProgressBarColor()}
                      size="xs"
                      maxH="3px"
                      disabled={true}
                    />
                  )}
                  {strength >= 2 && (
                    <Button
                      bgColor={getProgressBarColor()}
                      size="xs"
                      maxH="3px"
                      disabled={true}
                    />
                  )}
                  {strength >= 3 && (
                    <Button
                      bgColor={getProgressBarColor()}
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
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={handleBlur}
              bgColor="white"
              tabIndex={5}
            />
          </FormControl>
          {passwordMatchError && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              Entered passwords differ
            </Alert>
          )}
          <Box textAlign="center">
            <Button type="submit" colorScheme="orange" isLoading={isLoading}>
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Registration;

import React, { useEffect, useState } from "react";
import axios from "axios";

// import Cookies from 'js-cookie';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Card,
  Heading,
  Link,
  HStack,
  Text,
  Flex,
  Spacer,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../utils/icons";
import GoogleLoginButton from "./google";
import config from "../../config";

interface LoginReq {
  email: string;
  password: string;
}

const login = async (data: LoginReq): Promise<boolean> => {
  try {
    const resp = await axios.post(`http://${config.apiUrl}/login`, data, {
      withCredentials: true,
    });
    if (resp.data.code !== 0) {
      return false;
    } else {
      const uid = resp.headers["uid"];
      localStorage.setItem("uid", uid);
      return true;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return true;
  }
};

const Login = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginReq>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    login(formData)
      .then((result) => {
        setIsLoading(false);
        if (!result) {
          setLoginSuccess(false);
        } else {
          window.location.href = "/about";
        }
      })
      .catch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginSuccess(true);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
    if (isLogin) {
      navigate("/about");
    }
  }, [isLogin]);

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      shadow="lg"
    >
      <VStack width="100%" spacing={5}>
        <LogoIcon style={{ width: "4%", height: "4%" }} />
        <Heading fontSize={30}>Sign in to Brain</Heading>
        <Card
          width="30%"
          height="50%"
          justifyContent="center"
          bgColor="gray.100"
        >
          <VStack spacing={5} align="center" width="100%" p={3}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  backgroundColor="white"
                  tabIndex={1}
                />
              </FormControl>
              <FormControl>
                <Flex>
                  <FormLabel>Password</FormLabel>
                  <Spacer />
                  <Link color="blue.500" href="/forget">
                    Forgot password?
                  </Link>
                </Flex>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  backgroundColor="white"
                  width="100%"
                  tabIndex={2}
                />
              </FormControl>
              <Button
                isLoading={isLoading}
                loadingText="Login"
                type="submit"
                colorScheme="blue"
                width="100%"
                mt="20px"
              >
                Login
              </Button>
              <GoogleLoginButton />
              {/* <Button
                leftIcon={<AiFillGithub />}
                colorScheme="orange"
                onClick={handleGithubLogin}
                mt="20px"
                width="100%"
                // as={ReactRouterLink}
                // to="/about"
              >
                Login with GitHub
              </Button> */}
            </form>
            <HStack>
              <Text>New to Brain?</Text>
              <Link as={ReactRouterLink} to="/register" color="blue.500">
                Create an account
              </Link>
            </HStack>
          </VStack>
          {!loginSuccess && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>Email or password invalid.</AlertDescription>
            </Alert>
          )}
        </Card>
      </VStack>
    </Box>
  );
};

export default Login;

import { Box } from "@chakra-ui/react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GoogleLoginButton = () => {
  // const responseGoogle = (response) => {
  //   console.log(response);
  //   // Handle the response, e.g., send it to your server for authentication
  // };

  return (
    <Box mt={2}>
      <GoogleOAuthProvider
        clientId="974162545240-tth99qmn1fdknlj1gcfl9qopdehheign.apps.googleusercontent.com"
        //   buttonText="Login with Google"
        //   onSuccess={responseGoogle}
        //   onFailure={responseGoogle}
        //   cookiePolicy={'single_host_origin'}
      >
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </Box>
  );
};

export default GoogleLoginButton;

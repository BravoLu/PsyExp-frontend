import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/utils/NavBar";
import Footer from "./components/utils/footer";
import { GlobalProvider } from "./components/context";

import Login from "./components/login/login";
import Registration from "./components/register/register";
import UserProfile from "./components/profile/profile";
import Experiments from "./components/experiments/experiments";
import NewExperimentPage from "./components/experiments/new";
import ExpDetail from "./components/experiments/detail";
import MyExp from "./components/experiments/myexp";
import Home from "./components/home/home";
import UserPage from "./components/profile/userPage";
import Success from "./components/register/success";
import Failure from "./components/register/fail";
import ForgotPassword from "./components/login/forget";
import ResetPassword from "./components/login/reset";
import ResetRequest from "./components/login/resetsuccess";
import AlertResult, { Props } from "./components/utils/alert";
import UpdateExperimentPage from "./components/experiments/update";
import ManageExperiment from "./components/experiments/manage";
import YourParticipation from "./components/participation/query";

function App() {
  //
  const resetPasswordsuccess: Props = {
    status: "success",
    title: "Reset Password Success!",
    desc: "Your password has been reset successfully.",
  };

  return (
    <ChakraProvider>
      <GlobalProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/about" element={<UserProfile />} />
            <Route path="/experiments" element={<Experiments />} />
            <Route path="/newExp" element={<NewExperimentPage />} />
            <Route path="/detail/:id" element={<ExpDetail />} />
            <Route path="/myExp/:id" element={<MyExp />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
            <Route path="/forget" element={<ForgotPassword />} />
            <Route path="/reset/*" element={<ResetPassword />} />
            <Route path="/resetsuccess" element={<ResetRequest />} />
            <Route
              path="/resetPasswordsuccess"
              element={<AlertResult {...resetPasswordsuccess} />}
            />
            <Route path="/edit/:id" element={<UpdateExperimentPage />} />
            <Route path="/manage/:id" element={<ManageExperiment />} />
            <Route
              path="/yourParticipation/:id"
              element={<YourParticipation />}
            />
            <Route path="/*" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </GlobalProvider>
    </ChakraProvider>
  );
}

export default App;

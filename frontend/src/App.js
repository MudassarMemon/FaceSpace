import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import Splash from "../src/components/Splash/index";

function App() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      {!!sessionUser ? <Navigation /> : <Splash />}
      <Switch>
        <Route exact path="/">
          {/* <MainFeed /> */}
        </Route>
        <Route exact path="/users/:id">
          {/* <UserFeed user={user} /> */}
        </Route>
      </Switch>
    </>
  );
}

export default App;

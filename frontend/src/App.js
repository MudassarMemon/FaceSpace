import React from "react";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";

function App() {
  // const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <Switch>
        <Route path="/"></Route>
      </Switch>
      <Navigation />
    </>
  );
}

export default App;

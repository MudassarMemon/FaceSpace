import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePage from "./components/ProfilePage";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";

function App() {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    return <Splash />;
  } else {
    return (
      <>
        <Navigation />
        <Switch>
          <Route exact path="/">
            {/* <MainFeed /> */}
          </Route>
          <Route path="/users/:id">
            <ProfilePage />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;

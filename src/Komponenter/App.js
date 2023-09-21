import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Updateprofile from "./Updateprofile";
import Profile from "./Profile";
import NavBar from "./NavBar";

const appStyle = {
  master: {
    backgroundImage: "url(Images/blaafjaere.jpeg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "fixed",
    objectFit: "cover",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "-100",
    // transition: "all 0.5s ease-in-out",
    // transform: "scale(1.1)",
  },
};

function App() {
  return (
    <div style={appStyle.master}>
      <Router>
      <AuthProvider>
      <NavBar />
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={Updateprofile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;

// className="d-flex align-items-center justify-content-center"
//       style={{ minHeight: "100vh" }}

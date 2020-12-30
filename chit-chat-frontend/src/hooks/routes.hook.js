import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Chat from "../Components/Chat/Chat";
import Invitation from "../Components/Invitation/Invitation";
import Login from "../Components/Login/Login";
import Sidebar from "../Components/Sidebar/Sidebar";

export const useRoutes = (authenticated, messages) => {
  if (!authenticated)
    return (
      <Router>
        <Switch>
          <Route path="/:roomId?" exact component={Login} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );

  return (
    <Router>
      <Sidebar />
      <Switch>
        {/* <Route path="/rooms/:id" exact component={Chat} /> */}
        <Route path="/" exact render={() => <Chat messages={messages} />} />
        <Route path="/:roomId" exact component={Invitation} />
      </Switch>
    </Router>
  );
};

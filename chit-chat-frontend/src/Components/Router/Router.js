import { BrowserRouter } from "react-router-dom";
import Chat from "../../Pages/Chat/ChatContainer.js";
import Login from "../../Pages/Login/Login";
import { ProtectedRoute, GuestRoute } from "../ProtectedRoute/ProtectedRoute";

function Router({ isAuthenticated }) {
  return (
    <BrowserRouter>
      <ProtectedRoute
        path="/:invitationToken?"
        exact
        component={Chat}
        isAuthenticated={isAuthenticated}
      />
      <GuestRoute
        path="/login/:invitationToken?"
        exact
        component={Login}
        isAuthenticated={isAuthenticated}
      />
    </BrowserRouter>
  );
}

export default Router;

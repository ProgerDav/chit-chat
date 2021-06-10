import { useLayoutEffect, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser, setSocketId } from "./store/auth/auth.actions";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import Router from "./Components/Router/Router";
import "./App.css";
import { isAuthenticated } from "./store/auth/auth.selectors";
import SidebarContainer from "./Components/Sidebar/SidebarContainer";
import { usePusher } from "@harelpls/use-pusher";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: green[800],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

function App({ fetchUser, isAuthenticated, setSocketId }) {
  useLayoutEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const { client } = usePusher();
  useEffect(() => {
    client?.connection.bind("connected", () =>
      setSocketId(client.connection.socket_id)
    );

    // return () => client?.disconnect();
  }, [client, setSocketId]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <div className="app__body">
          {isAuthenticated && <SidebarContainer />}
          <Router isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default connect(
  (state) => ({ isAuthenticated: isAuthenticated(state) }),
  { fetchUser, setSocketId }
)(App);

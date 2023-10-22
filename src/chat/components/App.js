import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { Box, Spinner } from "@twilio-paste/core";

import Login from "./login/login";
import AppContainer from "./AppContainer";
import { actionCreators } from "../store";
import { getToken } from "../api";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators, dispatch);
  const token = useSelector((state) => state.token);

  const username = localStorage.getItem("username") ?? "";
  const password = localStorage.getItem("password") ?? "";

  useEffect(() => {
    if (username.length > 0 && password.length > 0) {
      getToken(username, password)
        .then((token) => {
          login(token);
        })
        .catch(() => {
          localStorage.setItem("username", "");
          localStorage.setItem("password", "");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const setToken = (token) => {
    login(token);
    setLoading(false);
  };

  if ((!token && !loading) || !username || !password) {
    return <Login setToken={setToken} />;
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        height="100%"
        width="100%"
      >
        <Spinner size="sizeIcon110" decorative={false} title="Loading" />
      </Box>
    );
  }

  return <AppContainer />;
}

export default App;

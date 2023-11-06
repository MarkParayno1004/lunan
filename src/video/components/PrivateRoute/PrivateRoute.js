import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAppState } from "../../state";

export default function PrivateRoute({ children, ...rest }) {
  const { isAuthReady, user } = useAppState();

  const renderChildren = user || !process.env.REACT_APP_SET_AUTH;

  if (!renderChildren && !isAuthReady) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        renderChildren ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

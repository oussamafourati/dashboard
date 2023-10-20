import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/compte/authSlice";
import type { LoginRequest, UserResponse } from "features/compte/compteSlice";

const AuthProtected = (props: any) => {
  var token = localStorage.getItem("auth");

  /*
    Navigate is un-auth access protected routes via url
    */

  if (!token) {
    return <Navigate to={{ pathname: "/login" }} />;
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };

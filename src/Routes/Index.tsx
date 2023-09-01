import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import NonAuthLayout from "Layout/NonAuthLayout";

//routes
// import { authProtectedRoutes } from "./allRoutes";
import { publicRoutes } from "./allRoutes";
import { AuthProtected } from "./AuthProtected";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes.map((route: any, idx: number) => (
            <Route
              key={idx}
              path={route.path}
              element={<Layout>{route.component}</Layout>}
              // exact={true}
            />
          ))}
        </Route>

        {/* <Route>
          {authProtectedRoutes.map((route: any, idx: number) => (
            <Route
              key={idx}
              path={route.path}
              element={<Layout>{route.component}</Layout>}
              exact={true}
            />
          ))}
        </Route> */}
      </Routes>
    </React.Fragment>
  );
};

export default Index;

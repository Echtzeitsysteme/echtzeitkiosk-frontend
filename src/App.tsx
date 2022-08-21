import React from "react";
import {
  Admin,
  CustomRoutes,
  Resource,
  ListGuesser,
  combineDataProviders,
  Authenticated,
} from "react-admin";

import { CssBaseline } from "@mui/material";

import polyglotI18nProvider from "ra-i18n-polyglot";
import jsonServerProvider from "ra-data-json-server";
import { Route } from "react-router";

import authProvider from "./authProvider";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";

import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

import englishMessages from "./i18n/en";
import { lightTheme } from "./layout/themes";

import RESTdataProvider from "./dataProvider";

import Configuration from "./configuration/Configuration";
import Users from "./pages/superuserPages/Users";

const dummyDataProvider = jsonServerProvider(
  "https://jsonplaceholder.typicode.com"
);

const dataProvider = combineDataProviders((resource) => {
  switch (resource) {
    case "dummy":
      return dummyDataProvider;
    default:
      return RESTdataProvider;
  }
});

const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === "fr") {
    return import("./i18n/fr").then((messages) => messages.default);
  }

  if (locale === "de") {
    return import("./i18n/de").then((messages) => messages.default);
  }

  // Always fallback on english
  return englishMessages;
}, "en");

const App = () => {
  return (
    <Admin
      title="Echtzeitkiosk"
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      loginPage={Login}
      layout={Layout}
      i18nProvider={i18nProvider}
      disableTelemetry
      theme={lightTheme}
    >
      {/* <CssBaseline /> */}
      <CustomRoutes>
        <Route path="/configuration" element={<Configuration />} />
      </CustomRoutes>

      <CustomRoutes noLayout>
        <Route path="/register" element={<Register />} />
      </CustomRoutes>

      <CustomRoutes noLayout>
        <Route path="/verify-email" element={<VerifyEmail />} />
      </CustomRoutes>

      <CustomRoutes noLayout>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </CustomRoutes>

      <CustomRoutes noLayout>
        <Route path="/reset-password" element={<ResetPassword />} />
      </CustomRoutes>

      <CustomRoutes>
        <Route
          path="/users"
          element={
            <Authenticated>
              <Users />
            </Authenticated>
          }
        />
      </CustomRoutes>

      <CustomRoutes>
        <Route
          path="/products"
          element={
            <Authenticated>
              {/* <Products /> */}
            </Authenticated>
          }
        />
      </CustomRoutes>

      {/* <CustomRoutes noLayout>
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </CustomRoutes> */}

      <Resource name="dummy" list={ListGuesser} />
    </Admin>
  );
};

export default App;

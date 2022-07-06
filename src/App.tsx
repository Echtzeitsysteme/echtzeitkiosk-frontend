import React from "react";
import {
  Admin,
  CustomRoutes,
  Resource,
  ListGuesser,
  combineDataProviders,
} from "react-admin";

import polyglotI18nProvider from "ra-i18n-polyglot";
import jsonServerProvider from "ra-data-json-server";
import { Route } from "react-router";

import authProvider from "./authProvider";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import englishMessages from "./i18n/en";
import { lightTheme } from "./layout/themes";

import RESTdataProvider from "./dataProvider";

import Configuration from "./configuration/Configuration";

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
      <CustomRoutes>
        <Route path="/configuration" element={<Configuration />} />
      </CustomRoutes>

      <Resource name="dummy" list={ListGuesser} />
    </Admin>
  );
};

export default App;

import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import {
  useTranslate,
  useLocaleState,
  useTheme,
  Title,
  useGetIdentity,
} from "react-admin";

import { darkTheme, lightTheme } from "../layout/themes";
import { API_URL } from "../utils/API_URL";
import axios from "axios";

const Configuration = () => {
  const translate = useTranslate();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const [userRole, setUserRole] = useState<any>();
  const [locale, setLocale] = useLocaleState();
  const [theme, setTheme] = useTheme();

  const [isEmailNotfForOrderEnabled, setIsEmailNotfForOrderEnabled] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        API_URL + "/users/" + localStorage.getItem("userId"),
        {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      const user = (await response.json()).data;

      return user;
    };

    (async () => {
      const user = await fetchUser();

      if (user.id === localStorage.getItem("userId")) {
        setIsEmailNotfForOrderEnabled(user.isEmailNotfForOrderEnabled);
      }
    })();
  }, []);

  useEffect(() => {
    if (identity) {
      setUserRole(identity.userRole);
    }
  }, [identity]);
  if (identityLoading) return <>Loading...</>;

  return (
    <Card>
      <Title title={translate("pos.configuration")} />
      <CardContent>
        <Box sx={{ width: "15em", display: "inline-block" }}>
          {translate("pos.theme.name")}
        </Box>
        <Button
          variant="contained"
          sx={{ margin: "1em" }}
          color={theme?.palette?.mode === "light" ? "primary" : "secondary"}
          onClick={() => setTheme(lightTheme)}
        >
          {translate("pos.theme.light")}
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "1em" }}
          color={theme?.palette?.mode === "dark" ? "primary" : "secondary"}
          onClick={() => setTheme(darkTheme)}
        >
          {translate("pos.theme.dark")}
        </Button>
      </CardContent>
      <CardContent>
        <Box sx={{ width: "15em", display: "inline-block" }}>
          {translate("pos.language")}
        </Box>
        <Button
          variant="contained"
          sx={{ margin: "1em" }}
          color={locale === "en" ? "primary" : "secondary"}
          onClick={() => setLocale("en")}
        >
          en
        </Button>
        {/* <Button
                    variant="contained"
                    sx={{ margin: '1em' }}
                    color={locale === 'fr' ? 'primary' : 'secondary'}
                    onClick={() => setLocale('fr')}
                >
                    fr
                </Button> */}
        <Button
          variant="contained"
          sx={{ margin: "1em" }}
          color={locale === "de" ? "primary" : "secondary"}
          onClick={() => setLocale("de")}
        >
          de
        </Button>
      </CardContent>
      {userRole === "STANDARD" && (
        <CardContent>
          <Box
            sx={{
              width: "15em",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* impl a check box for optional email notf for orders */}
            {translate(
              "echtzeitkiosk.email.notification_checkbox_for_customer_order"
            )}
            <Checkbox
              checked={isEmailNotfForOrderEnabled}
              onClick={() => {
                setIsEmailNotfForOrderEnabled(!isEmailNotfForOrderEnabled);
                (async () => {
                  const urlParams = {
                    isEmailNotfForOrderEnabled: !isEmailNotfForOrderEnabled,
                  };
                  console.log(urlParams);
                  const data = Object.keys(urlParams)
                    .map(
                      (key) => `${key}=${encodeURIComponent(urlParams[key])}`
                    )
                    .join("&");

                  const options = {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/x-www-form-urlencoded",
                      Authorization: `${localStorage.getItem("token")}`,
                    },

                    data,
                    url: `${API_URL}/users/` + localStorage.getItem("userId"),
                  };

                  const resp = await axios(options);
                  setIsEmailNotfForOrderEnabled(!isEmailNotfForOrderEnabled);
                })();
              }}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 }, left: "4em" }}
            />
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

export default Configuration;

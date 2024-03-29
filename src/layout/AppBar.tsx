import * as React from "react";
import { AppBar, Logout, UserMenu, useTranslate } from "react-admin";
import { Link } from "react-router-dom";
import {
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  Theme,
  Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PasswordIcon from "@mui/icons-material/Password";

import Logo from "./Logo";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../utils/API_URL";
// import ChangePassword from './ChangePassword';

const ConfigurationMenu = React.forwardRef((props, ref) => {
  const translate = useTranslate();
  return (
    <MenuItem
      component={Link}
      // @ts-ignore
      ref={ref}
      {...props}
      to="/configuration"
    >
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText>{translate("pos.configuration")}</ListItemText>
    </MenuItem>
  );
});

const ChangePassword = () => {
  const translate = useTranslate();
  return (
    <MenuItem
      onClick={() => {
        (async () => {
          const { value: formValues } = await Swal.fire({
            title: translate("resources.customers.fieldGroups.change_password"),
            html:
            `<b> ${translate("resources.customers.fieldGroups.password_req")}</b> <br>` +
            `<input type="password" id="swal-input1" class="swal2-input"  placeholder="${translate("resources.customers.fieldGroups.old_password")}">` +
            `<input type="password" id="swal-input2" class="swal2-input"  placeholder="${translate("resources.customers.fieldGroups.new_password")}">` +
            `<input type="password" id="swal-input3" class="swal2-input"  placeholder="${translate("resources.customers.fieldGroups.confirm_password")}">`,
            focusConfirm: false,
            preConfirm: () => {
              return [
                (document.getElementById("swal-input1") as HTMLInputElement)
                  .value,
                (document.getElementById("swal-input2") as HTMLInputElement)
                  .value,
                (document.getElementById("swal-input3") as HTMLInputElement)
                  .value,
              ];
            },
          });

          if (formValues) {
            const [password, passwordNew, passwordConfirm] = formValues;
            if (passwordNew !== passwordConfirm) {
              Swal.fire(
                "Error",
                translate("resources.customers.fieldGroups.password_missmatch"), 
                "error"
              );
            } else {
              const urlParams = {
                password,
                passwordNew,
                passwordConfirm,
              };

              const data = Object.keys(urlParams)
                .map((key) => `${key}=${encodeURIComponent(urlParams[key])}`)
                .join("&");

              let response;
              try {
                response = await axios({
                  method: "POST",
                  url: `${API_URL}/auth/change-password`,
                  headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                  },
                  data,
                });
              } catch (error) {
                await Swal.fire({
                  title: "Error",
                  text: `${translate("echtzeitkiosk.feedback.errors.something_wrong")}
                        ${error}`,
                  icon: "error",
                });
              }

              if (response.status === 200) {
                await Swal.fire({
                  title: "Success",
                  text: translate("resources.customers.fieldGroups.password_success"),
                  icon: "success",
                });
              } else {
                await Swal.fire({
                  title: "Error",
                  text: `${translate("echtzeitkiosk.feedback.errors.something_wrong")}
                          ${response}`,
                  icon: "error",
                });
              }
            }
          }
        })();
      }}
    >
      <ListItemIcon>
        <PasswordIcon />
      </ListItemIcon>
      <ListItemText>
        {translate("resources.customers.fieldGroups.change_password")}
      </ListItemText>
    </MenuItem>
  );
};

const CustomUserMenu = () => (
  <UserMenu>
    <ConfigurationMenu />
    <ChangePassword />
    <Logout />
  </UserMenu>
);

const CustomAppBar = (props: any) => {
  const isLargeEnough = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("sm")
  );
  return (
    <AppBar
      {...props}
      color="secondary"
      elevation={1}
      userMenu={<CustomUserMenu />}
    >
      <Typography
        variant="h6"
        color="inherit"
        sx={{
          flex: 1,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
        id="react-admin-title"
      />
      {isLargeEnough && <Logo />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  );
};

export default CustomAppBar;

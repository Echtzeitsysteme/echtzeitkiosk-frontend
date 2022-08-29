import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
  Form,
  useTranslate,
  useNotify,
  required,
  TextInput,
  email,
} from "react-admin";

import {
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Typography,
} from "@mui/material";

import { API_URL } from "../../utils/API_URL";
import Logo from "../../layout/Logo";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const translate = useTranslate();
  const notify = useNotify();
  const navigate = useNavigate();

  const handleSubmit = async (registerFormValues: RegisterFormValues) => {
    setLoading(true);
    let response;
    try {
      if (registerFormValues.password !== registerFormValues.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const urlParams = {
        email: registerFormValues.email,
        password: registerFormValues.password,
        firstName: registerFormValues.firstName,
        lastName: registerFormValues.lastName,
        invitationCode: registerFormValues.invitationCode,
        username: registerFormValues.username,
        language: registerFormValues.language,
      };

      const data = Object.keys(urlParams)
        .map((key) => `${key}=${encodeURIComponent(urlParams[key])}`)
        .join("&");

      response = await axios({
        method: "POST",
        url: `${API_URL}/auth/register`,
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        data,
      });

      if (response.status === 200) {
        notify(translate("custom_auth.register_success"));
        navigate("/login");
      } else {
        setLoading(false);
        throw new Error(response.statusText);
      }
    } catch (error) {
      setLoading(false);
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message
          ? "custom.sign_in_error"
          : error.message,
        {
          type: "warning",
          messageArgs: {
            _:
              typeof error === "string"
                ? error
                : error && error.message
                ? error.message
                : undefined,
          },
        }
      );
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "url(https://source.unsplash.com/random/1600x900/?food)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: -1,
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "30vw",
            minHeight: "70vh",
            marginTop: "8em",
            boxShadow: "0px 10px 13px -7px #000000",
            border: "5px 5px 15px 5px #000000",
          }}
        >
          <Box
            sx={{
              padding: "1em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo />
          </Box>

          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: "bold",
            }}
          >
            {translate("custom_auth.create_a_new_account")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box sx={{ padding: "0 1em 1em 1em" }}>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  autoFocus
                  source="email"
                  type="email"
                  label="Email"
                  disabled={loading}
                  validate={required()}
                  fullWidth
                  variant="standard"
                />
              </Box>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  source="password"
                  label={translate("ra.auth.password")}
                  type="password"
                  disabled={loading}
                  validate={required()}
                  fullWidth
                  variant="standard"
                />
              </Box>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  source="confirmPassword"
                  label={translate("custom_auth.confirm_password")}
                  type="password"
                  disabled={loading}
                  validate={required()}
                  fullWidth
                  variant="standard"
                />
              </Box>

              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  source="invitationCode"
                  label={translate("custom_auth.invitation_code")}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                  variant="standard"
                />
              </Box>
            </Box>

            <Box sx={{ padding: "0 1em 1em 1em" }}>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  source="firstName"
                  label={translate("resources.customers.fields.first_name")}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                  variant="standard"
                />
              </Box>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  source="lastName"
                  label={translate("resources.customers.fields.last_name")}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                  variant="standard"
                />
              </Box>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  source="username"
                  label={translate("ra.auth.username")}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                  variant="standard"
                />
              </Box>

              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  source="language"
                  defaultValue="de-DE"
                  label={translate("pos.language")}
                  disabled={true}
                  validate={required()}
                  fullWidth
                  variant="standard"
                />
              </Box>
            </Box>
          </Box>

          <CardActions
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading && <CircularProgress size={25} thickness={2} />}
              {translate("custom_auth.register")}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              disabled={loading}
              fullWidth
              onClick={() => navigate("/login")}
              sx={{
                marginTop: "1em",
              }}
            >
              {translate("custom_auth.already_have_an_account")}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Form>
  );
};

Register.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default Register;

interface RegisterFormValues {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  invitationCode?: string;
  language?: string;
}

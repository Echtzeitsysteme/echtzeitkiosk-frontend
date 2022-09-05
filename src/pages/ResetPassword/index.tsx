import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Form, useTranslate, useNotify, TextInput } from "react-admin";

import {
  Box,
  Button,
  Card,
  // CircularProgress,
  Typography,
} from "@mui/material";

import { API_URL } from "../../utils/API_URL";
import { getRandomBackground } from "../../utils/getRandomBackground";
import Logo from "../../layout/Logo";

const ResetPassword = () => {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const translate = useTranslate();
  const notify = useNotify();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleResetPassword = (
    resetPasswordFormValues: ResetPasswordFormValues
  ) => {
    setLoading(true);

    // compare new password and confirm password
    if (
      resetPasswordFormValues.newPassword !=
      resetPasswordFormValues.confirmPassword
    ) {
      console.log("password mismatch");
      notify("Password and confirm password do not match");
      setLoading(false);
      console.log("Password and confirm password do not match");
      return false;
    } else {
      console.log("password match");

      fetch(
        API_URL + `/auth/reset-password?token=${searchParams.get("token")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `password=${encodeURIComponent(
            resetPasswordFormValues.newPassword
          )}`,
        }
      )
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            notify("Password reset successfully");
            setIsSuccess(true);
          } else {
            setLoading(false);

            const data = response.json().then((data) => {
              notify(data.errorMessage);
            });

            setIsSuccess(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          notify(`Password reset failed: ${error}`);
          setIsSuccess(false);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",

        alignItems: "center",
        justifyContent: "flex-start",
        background: getRandomBackground(),
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
          minHeight: "20vh",
          marginTop: "8em",
          boxShadow: "0px 10px 13px -7px #000000",
          border: "5px 5px 15px 5px #000000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1em",
          }}
        >
          <Logo />
          <Typography variant="h5">Reset Password</Typography>

          {!loading && !isSuccess ? (
            <Typography
              variant="body1"
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              Wrong/empty token or wrong password provided!
              {/* TODO translate */}
            </Typography>
          ) : (
            <></>
          )}
          {!isSuccess ? (
            <Form onSubmit={handleResetPassword}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  source="newPassword"
                  label="New password"
                  name="newPassword"
                  type="password"
                  placeholder="New password"
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                />
                <TextInput
                  source="confirmPassword"
                  label="Confirm new password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  Reset Password
                </Button>
              </Box>
            </Form>
          ) : (
            <Typography
              variant="body1"
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              Password reset successfully!
            </Typography>
          )}

          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/login")}
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            Login
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

ResetPassword.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default ResetPassword;

interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

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
import Logo from "../../layout/Logo";

const ResetPassword = () => {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const translate = useTranslate();
  const notify = useNotify();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleForgotPassword = (
    forgotPasswordFormValus: ForgotPasswordFormValus
  ) => {
    setLoading(true);

    // compare new password and confirm password
    if (forgotPasswordFormValus.email != forgotPasswordFormValus.confirmEmail) {
      notify("Email and confirm email do not match");
      setLoading(false);
      return false;
    } else {
      fetch(API_URL + `/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(forgotPasswordFormValus.email)}`,
      })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            notify("Forgot password email sent successfully");
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
          notify(`Forgot password email failed: ${error}`);
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
          <Typography variant="h5">Forgot Password?</Typography>

          {!loading && !isSuccess ? (
            <Typography
              variant="body1"
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              Incorrect or missing email address. Please try again.
              {/* TODO translate */}
            </Typography>
          ) : (
            <></>
          )}
          {!isSuccess ? (
            <Form onSubmit={handleForgotPassword}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  source="email"
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                />
                <TextInput
                  source="confirmEmail"
                  label="Confirm email"
                  name="confirmEmail"
                  type="email"
                  placeholder="Confirm email"
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
                  Send password reset link to your email
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
              Password reset link has been sent to your email.
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

interface ForgotPasswordFormValus {
  email: string;
  confirmEmail: string;
}

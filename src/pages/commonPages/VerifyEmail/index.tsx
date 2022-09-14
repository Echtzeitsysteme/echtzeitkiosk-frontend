import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useTranslate, useNotify } from "react-admin";

import { Box, Button, Card, Typography } from "@mui/material";

import { API_URL } from "../../../utils/API_URL";
import { getRandomBackground } from "../../../utils/getRandomBackground";

import Logo from "../../../layout/Logo";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const translate = useTranslate();
  const notify = useNotify();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyEmailToken = searchParams.get("token");

    if (verifyEmailToken) {
      setLoading(true);
      fetch(API_URL + `/auth/verify-email?token=${verifyEmailToken}`, {
        method: "POST",
      })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            notify("Email verified successfully");
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
          notify("Email verification failed");
          setIsSuccess(false);
        });
    }
  }, [searchParams]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",

        alignItems: "center",
        justifyContent: "flex-start",
        background: getRandomBackground(),
        backgroundColor: "rgba(0,0,0,0.5)",
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
          <Typography
            sx={{
              margin: "1em",
            }}
            variant="h5"
          >
            {translate("echtzeitkiosk.email.verify_email_title")}
          </Typography>

          {loading && !isSuccess ? (
            <Typography
              variant="body1"
              sx={{
                marginBottom: "1rem",
              }}
            >
              {translate("echtzeitkiosk.email.bad_token")}
            </Typography>
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{
                  marginBottom: "1rem",
                }}
              >
                {isSuccess
                  ? translate("echtzeitkiosk.email.verify_email_success")
                  : translate("echtzeitkiosk.email.verify_email_error")}
              </Typography>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            {translate("ra.auth.sign_in")}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

VerifyEmail.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default VerifyEmail;

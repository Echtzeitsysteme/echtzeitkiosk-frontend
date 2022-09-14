import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import Swal from "sweetalert2";

import { useTranslate } from "react-admin";

import { Box, Button, Card, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

import { API_URL } from "../../../utils/API_URL";

const SystemState = () => {
  const [systemBalance, setSystemBalance] = useState(undefined);

  const translate = useTranslate();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `${localStorage.getItem("token")}`,
      },
      url: `${API_URL}/system-state/balance`,
    };

    axios(options).then((response) => {
      console.log(response.data);
      setSystemBalance(response.data.data.balance);
    });
  }, [systemBalance]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",

        alignItems: "center",
        justifyContent: "flex-start",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        zIndex: -1,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",

          flexWrap: "wrap",
          alignItems: "center",
          minWidth: "95vw",
          minHeight: "80vh",
          marginTop: "1em",
          paddingTop: "1em",
          boxShadow: "0px 10px 13px -7px #000000",
          border: "5px 5px 15px 5px #000000",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ color: "primary" }}>
            {/* {translate("resources.systemState.name")} */}
            System State
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              boxShadow: "0px 10px 13px -7px #000000",
              border: "5px 5px 15px 5px #000000",
              margin: "1rem",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              sx={{ margin: "1rem" }}
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, send them!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    const options = {
                      method: "POST",
                      headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                      },
                      url: `${API_URL}/customer-invoices/send-everyone`,
                    };
                    axios
                      .request(options)
                      .then((res) => {
                        if (res.status === 200) {
                          Swal.fire({
                            title: "Success",
                            text: "Invoices sent successfully",
                            icon: "success",
                            confirmButtonText: "Ok",
                          });
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                });
              }}
            >
              {translate("echtzeitkiosk.system_state.send_invoice_to_all")}
            </Button>
            <HelpIcon
              sx={{
                color: "red",
                marginLeft: "0.3rem",
                fontSize: "2rem",
              }}
              onClick={() => {
                Swal.fire({
                  title: translate(
                    "echtzeitkiosk.system_state.send_invoice_to_all_help_text"
                  ),
                  icon: "info",
                });
              }}
            />
          </Card>

          <Card
            sx={{
              // minWidth: "15vw",
              // minHeight: "15vh",
              margin: "1rem",
              padding: "1em",
              boxShadow: "0px 10px 13px -7px #000000",
              border: "5px 5px 15px 5px #000000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>
              {translate("echtzeitkiosk.treasury.current_balance")}:{" "}
              {systemBalance !== undefined
                ? `${systemBalance} €`
                : "Loading..."}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: "1em" }}
              onClick={async () => {
                await Swal.fire({
                  title: translate(
                    "echtzeitkiosk.treasury.update_dialog.title"
                  ),
                  text: translate(
                    "echtzeitkiosk.treasury.update_dialog.description"
                  ),
                  input: "text",
                  inputPlaceholder: translate(
                    "echtzeitkiosk.treasury.update_dialog.placeholder"
                  ),
                  showCancelButton: true,
                  cancelButtonText: translate("echtzeitkiosk.buttons.cancel"),
                  confirmButtonText: translate("echtzeitkiosk.buttons.update"),
                  showLoaderOnConfirm: true,
                  backdrop: true,
                  preConfirm: async (balance) => {
                    try {
                      const urlParams = {
                        balance,
                      };
                      const data = Object.keys(urlParams)
                        .map(
                          (key) =>
                            `${key}=${encodeURIComponent(urlParams[key])}`
                        )
                        .join("&");

                      const options = {
                        method: "PATCH",
                        headers: {
                          "content-type": "application/x-www-form-urlencoded",
                          Authorization: `${localStorage.getItem("token")}`,
                        },

                        data,
                        url: `${API_URL}/system-state/balance`,
                      };

                      const resp = await axios(options);

                      if (resp.status === 200) {
                        setSystemBalance(resp.data.data.balance);
                        return true;
                      }
                    } catch (error) {}
                  },
                  allowOutsideClick: () => !Swal.isLoading(),
                }).finally(() => {
                  // window.location.reload();
                });
              }}
            >
              {translate("echtzeitkiosk.treasury.update_dialog.title")}
            </Button>
          </Card>

          {/* <Card
            sx={{
              minWidth: "20vw",
              minHeight: "20vh",
              margin: "1rem",
              boxShadow: "0px 10px 13px -7px #000000",
              border: "5px 5px 15px 5px #000000",
            }}
          >
            <Typography>Test</Typography>
          </Card> */}
        </Box>
      </Card>
    </Box>
  );
};

SystemState.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default SystemState;

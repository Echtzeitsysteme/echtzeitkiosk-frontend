import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

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
  TextField,
  Typography,
} from "@mui/material";

import { API_URL } from "../../../utils/API_URL";

const SystemState = () => {
  const [loading, setLoading] = useState(true);

  const translate = useTranslate();
  const notify = useNotify();

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
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          alignItems: "center",
          minWidth: "95vw",
          minHeight: "80vh",
          marginTop: "1em",
          boxShadow: "0px 10px 13px -7px #000000",
          border: "5px 5px 15px 5px #000000",
        }}
      >
        <Card
          sx={{
            minWidth: "20vw",
            minHeight: "20vh",
            boxShadow: "0px 10px 13px -7px #000000",
            border: "5px 5px 15px 5px #000000",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "1em" }}
            onClick={() => {
              setLoading(true);
              axios
                .get(`${API_URL}/systemState`)
                .then((res) => {
                  console.log(res.data);
                  setLoading(false);
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });
            }}
          >
            Send Invoice To All Customers
          </Button>
        </Card>

        <Card
          sx={{
            minWidth: "20vw",
            minHeight: "20vh",
            boxShadow: "0px 10px 13px -7px #000000",
            border: "5px 5px 15px 5px #000000",
          }}
        >
          <Typography>Current Cash Balance: ...</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "1em" }}
            onClick={async () => {
              await Swal.fire({
                title: translate("echtzeitkiosk.balance.update"),
                text: translate("echtzeitkiosk.balance.update_descr"),
                input: "text",
                inputPlaceholder: translate(
                  "echtzeitkiosk.balance.update_placeholder"
                ),
                showCancelButton: true,
                cancelButtonText: translate("echtzeitkiosk.buttons.cancel"),
                confirmButtonText: translate("echtzeitkiosk.buttons.update"),
                showLoaderOnConfirm: true,
                preConfirm: async (balance) => {
                  try {
                    const urlParams = {
                      balance,
                    };
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
                      url: `${API_URL}/system-state/balance/`,
                    };

                    const resp = await axios(options);
                  } catch (error) {}
                },
                allowOutsideClick: () => !Swal.isLoading(),
              }).finally(() => {
                window.location.reload();
              });
            }}
          >
            Update Cash Balance
          </Button>
        </Card>

        <Card
          sx={{
            minWidth: "20vw",
            minHeight: "20vh",
            boxShadow: "0px 10px 13px -7px #000000",
            border: "5px 5px 15px 5px #000000",
          }}
        >
          <Typography>Test</Typography>
        </Card>
        <Card
          sx={{
            minWidth: "20vw",
            minHeight: "20vh",
            boxShadow: "0px 10px 13px -7px #000000",
            border: "5px 5px 15px 5px #000000",
          }}
        >
          <Typography>Test</Typography>
        </Card>

        <Card
          sx={{
            minWidth: "20vw",
            minHeight: "20vh",
            boxShadow: "0px 10px 13px -7px #000000",
            border: "5px 5px 15px 5px #000000",
          }}
        >
          <Typography>Test</Typography>
        </Card>

        <Card
          sx={{
            minWidth: "20vw",
            minHeight: "20vh",
            boxShadow: "0px 10px 13px -7px #000000",
            border: "5px 5px 15px 5px #000000",
          }}
        >
          <Typography>Test</Typography>
        </Card>
      </Card>
    </Box>
  );
};

SystemState.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default SystemState;

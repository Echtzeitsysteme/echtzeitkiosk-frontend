import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
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

const columns: GridColDef[] = [
  {
    field: "firstName",
    //   headerName: translate("resources.users.firstName"),
    headerName: "First Name",
    width: 150,
  },
  {
    field: "lastName",
    //   headerName: translate("resources.users.lastName"),
    headerName: "Last Name",
    width: 150,
  },
  {
    field: "email",
    //   headerName: translate("resources.users.email"),
    headerName: "Email",
    width: 150,
  },
  {
    field: "username",
    //   headerName: translate("resources.users.username"),
    headerName: "Username",
    width: 150,
  },
  {
    field: "isApproved",
    //   headerName: translate("resources.users.isApproved"),
    headerName: "Approved",
    width: 200,
    renderCell: (params: any) => {
      return params.value ? (
        "Yes"
      ) : (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={(event) => {
              handleApproveRegistration(event, params);
              // console.log("params", params);
            }}
          >
            Approve
          </Button>

          <Button
            sx={{ marginLeft: "1rem" }}
            variant="contained"
            color="error"
            onClick={(event) => {
              handleDeclineRegistration(event, params);
            }}
          >
            Decline
          </Button>
        </>
      );
    },
  },
  {
    field: "isEmailVerified",
    //   headerName: translate("resources.users.isEmailVerified"),
    headerName: "Email Verified",
    width: 100,
    renderCell: (params: any) => {
      return params.value ? "Yes" : "No";
    },
  },
  {
    field: "createdAt",
    //   headerName: translate("resources.users.createdAt"),
    headerName: "Created At",

    width: 150,
  },
  {
    field: "balance",
    //   headerName: translate("resources.users.balance"),
    headerName: "Balance (EUR)",
    width: 150,
    renderCell: (params: any) => {
      // show the current balance and add a button to update the balance of the user. The button should open a modal that allows the user to update the balance. Use Swal for the modal.

      return (
        <>
          <Typography variant="body2">{params.value}</Typography>
          <Button
            sx={{ marginLeft: "1rem" }}
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleUpdateBalance(event, params);
            }}
          >
            Update
          </Button>
        </>
      );
    },
  },
];

const rows: GridRowsProp = [];

const handleApproveRegistration = async (event: any, params: any) => {
  console.log("handleApproveRegistration", params);

  const fetchData = async () => {
    try {
      const resp = await axios({
        method: "POST",
        url: `${API_URL}/auth/register/approve-registration/` + params.row.id,
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {}
  };

  await fetchData();

  window.location.reload();
};

const handleDeclineRegistration = async (event: any, params: any) => {
  console.log("handleDeclineRegistration", params);

  const fetchData = async () => {
    try {
      const resp = await axios({
        method: "POST",
        url: `${API_URL}/auth/register/decline-registration/` + params.row.id,
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {}
  };

  await fetchData();

  window.location.reload();
};

const handleUpdateBalance = async (event: any, params: any) => {
  console.log("handleUpdateBalance", params);

  const updateBalance = async (balance, id) => {
    try {
      const urlParams = {
        balance,
      };
      const data = Object.keys(urlParams)
        .map((key) => `${key}=${encodeURIComponent(urlParams[key])}`)
        .join("&");

      const options = {
        method: "PATCH",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `${localStorage.getItem("token")}`,
        },

        data,
        url: `${API_URL}/users/` + id,
      };

      const resp = await axios(options);
    } catch (error) {}
  };

  Swal.fire({
    title: "Update Balance",
    text: "Enter the new balance",
    input: "text",
    inputPlaceholder: "New Balance, e.g. 100.00",
    showCancelButton: true,
    confirmButtonText: "Update",
    showLoaderOnConfirm: true,
    preConfirm: (balance) => {
      updateBalance(balance, params.row.id);
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).finally(() => {
    window.location.reload();
  });
};

const RecentRegistrations = () => {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rows, setRows] = useState([]);

  const translate = useTranslate();
  const notify = useNotify();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios({
          method: "GET",
          url: `${API_URL}/users`,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        const data: [] = await resp?.data.data;

        setLoading(false);
        setIsSuccess(true);

        const usersToShow = data.filter((user: any) => {
          return (
            user.isApproved === false ||
            (!moment(user.createdAt).isBefore(moment().subtract(1, "days")) &&
              user.role !== "SUPERUSER")
          );
        });

        setRows(usersToShow);
        console.log(usersToShow);
      } catch (error) {
        // setServerError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "60vh",
        maxWidth: "95vw",

        alignItems: "center",
        justifyContent: "flex-start",
        // background: "url(https://source.unsplash.com/random/1600x900/?food)",
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
          minWidth: "94vw",
          minHeight: "50vh",
          marginTop: "3em",
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
          }}
        >
          <Typography variant="h5">Recent Registrations</Typography>

          <Box sx={{ minHeight: "300%", width: "600%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

RecentRegistrations.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default RecentRegistrations;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

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
    headerName: "Is Approved",
    width: 150,
  },
  {
    field: "isEmailVerified",
    //   headerName: translate("resources.users.isEmailVerified"),
    headerName: "Is Email Verified",
    width: 150,
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
    headerName: "Balance",
    width: 150,
  },
];
const rows: GridRowsProp = [
  {
    id: 1,
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    username: "username",
    isApproved: "isApproved",
    isEmailVerified: "isEmailVerified",
    createdAt: "createdAt",
    balance: "balance",
  },
  {
    id: 2,
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    username: "username",
    isApproved: "isApproved",
    isEmailVerified: "isEmailVerified",
    createdAt: "createdAt",
    balance: "balance",
  },
];
const RecentRegistrations = () => {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const translate = useTranslate();
  const notify = useNotify();
  const navigate = useNavigate();

  //   const rows: GridRowsProp[] = [
  //     {
  //       id: 1,
  //       firstName: "John",
  //       lastName: "Doe",
  //       email: "test@example.com",
  //       username: "test",
  //       isApproved: true,
  //       isEmailVerified: true,
  //       createdAt: "2020-01-01",
  //       balance: 0,
  //     },
  //     {
  //       id: 2,
  //       firstName: "John",
  //       lastName: "Doe",
  //       email: "test@example.com",
  //       username: "test",
  //       isApproved: true,
  //       isEmailVerified: true,
  //       createdAt: "2020-01-01",
  //       balance: 0,
  //     },
  //   ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "60vh",
        maxWidth: "95vw",

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
          {/* <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
            // loading={loading}
            disableSelectionOnClick
            sx={{
              border: "none",
            }}
          /> */}
          <Box sx={{ minHeight: "300%", width: "600%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
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

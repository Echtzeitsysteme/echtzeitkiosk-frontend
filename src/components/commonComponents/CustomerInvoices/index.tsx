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

interface Props {
  dataGridSx?: any;
}

const CustomerInvoices = (props: Props) => {
  const { dataGridSx } = props;

  const translate = useTranslate();

  const columns: GridColDef[] = [
    {
      field: "customerInvoiceMonthYear",
      //   headerName: translate("resources.users.firstName"),
      headerName: "Month-Year",
      width: 150,
    },
    {
      field: "total",
      //   headerName: translate("resources.users.balance"),
      headerName: "Total (EUR)",
      width: 150,
    },
    {
      field: "user",
      //   headerName: translate("resources.users.balance"),
      headerName: "User",
      width: 150,
    },
    {
      field: "currentUserBalance",
      //   headerName: translate("resources.users.createdAt"),
      headerName: "Current User Balance (EUR)",
      width: 200,
    },
    {
      field: "customerInvoiceType",
      //   headerName: translate("resources.users.createdAt"),
      headerName: "Type",
      width: 200,
    },
    {
      field: "createdAt",
      //   headerName: translate("resources.users.createdAt"),
      headerName: "Created At",
      width: 200,
    },
    {
      field: "Download",
      //   headerName: translate("resources.users.createdAt"),
      headerName: "Download",
      width: 200,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.open(
                `${API_URL}/customer-invoices/${params.row.id}/generate-customer-invoice-pdf`,
                "_blank"
              );
            }}
          >
            Download PDF
          </Button>
        );
      },
    },
  ];

  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rows, setRows] = useState([]);

  const notify = useNotify();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios({
          method: "GET",
          url: `${API_URL}/customer-invoices`,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        const data: [] = await resp?.data.data;

        console.log(data);

        setLoading(false);
        setIsSuccess(true);

        let customerInvoicesToDisplay = [];

        data.forEach((customerInvoice: any) => {
          customerInvoicesToDisplay.push({
            id: customerInvoice.id,
            createdAt: new Date(customerInvoice.createdAt).toLocaleString(
              "de-DE",
              {
                timeZone: "Europe/Berlin",
              }
            ),
            customerInvoiceMonthYear: customerInvoice.monthYear,
            customerInvoiceType: customerInvoice.customerInvoiceType,
            total: customerInvoice.total,
            user: customerInvoice.user.email,
            currentUserBalance: customerInvoice.currentUserBalance,
          });
        });

        console.log(customerInvoicesToDisplay);

        setRows(customerInvoicesToDisplay);
        console.log("customerInvoicesToDisplay", customerInvoicesToDisplay);
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
          minWidth: "90vw",

          minHeight: "50vh",
          marginTop: "2em",
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
          <Typography
            variant="h5"
            sx={{
              marginTop: "1rem",
            }}
          >
            {translate("echtzeitkiosk.customer_invoices.name")}
          </Typography>

          <DataGrid
            sx={dataGridSx || { minWidth: "88vw", minHeight: "40vh" }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </Box>
      </Card>
    </Box>
  );
};

CustomerInvoices.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default CustomerInvoices;

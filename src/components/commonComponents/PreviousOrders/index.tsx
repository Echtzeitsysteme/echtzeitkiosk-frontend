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

const PreviousOrders = (props: Props) => {
  const { dataGridSx } = props;

  const translate = useTranslate();

  const columns: GridColDef[] = [
    {
      field: "productTitle",
      //   headerName: translate("resources.users.firstName"),
      headerName: "Product Title",
      width: 150,
    },
    {
      field: "pricePerUnit",
      //   headerName: translate("resources.users.balance"),
      headerName: "Unit Price (EUR)",
      width: 150,
    },
    {
      field: "quantity",
      //   headerName: translate("resources.users.balance"),
      headerName: "Quantity",
      width: 150,
    },
    {
      field: "createdAt",
      //   headerName: translate("resources.users.createdAt"),
      headerName: "Created At",
      width: 200,
    },
    {
      field: "orderId",
      //   headerName: translate("resources.users.createdAt"),
      headerName: "Order ID",
      width: 200,
    },
    {
      field: "email",
      //   headerName: translate("resources.users.email"),
      headerName: "Email",
      width: 200,
    },
    {
      field: "id",
      headerName: "Order Item ID",
      width: 150,
      hide: true,
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
          url: `${API_URL}/customer-orders`,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        const data: [] = await resp?.data.data;

        console.log(data);

        setLoading(false);
        setIsSuccess(true);

        let customerOrdersToDisplay = [];

        data.forEach((order: any) => {
          const tempList = [];

          order.customerOrderItems.forEach((item) => {
            tempList.push({
              productTitle: item.product.productTitle,
              pricePerUnit: item.pricePerUnit,
              quantity: item.quantity,
              createdAt: new Date(order.createdAt).toLocaleString("de-DE", {
                timeZone: "Europe/Berlin",
              }),
              orderId: order.id,
              email: order.user.email,
              id: item.id,
            });
          });

          customerOrdersToDisplay = [...customerOrdersToDisplay, ...tempList];
        });

        setRows(customerOrdersToDisplay);
        console.log("customerOrdersToDisplay", customerOrdersToDisplay);
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
            {translate("echtzeitkiosk.PreviousOrders")}
          </Typography>

          <DataGrid
            sx={dataGridSx || { minWidth: "88vw", minHeight: "40vh" }}
            // sx={{
            // minWidth: "88vw",
            // minHeight: "40vh",
            // }}
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

PreviousOrders.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default PreviousOrders;

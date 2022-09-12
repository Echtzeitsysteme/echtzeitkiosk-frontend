import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

import { useTranslate } from "react-admin";

import { Box, Card, Typography } from "@mui/material";

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
      headerName: translate("echtzeitkiosk.products.product_title"),
      width: 150,
    },
    {
      field: "pricePerUnit",
      headerName: translate("echtzeitkiosk.products.unit_price"),
      width: 150,
    },
    {
      field: "quantity",
      headerName: translate("echtzeitkiosk.products.quantity"),
      width: 150,
    },
    {
      field: "createdAt",
      headerName: translate("echtzeitkiosk.products.created_at"),
      width: 200,
    },
    {
      field: "orderId",
      headerName: translate("echtzeitkiosk.customer_invoices.order_id"),
      width: 200,
    },
    {
      field: "email",
      headerName: translate("echtzeitkiosk.customer_invoices.user"),
      width: 300,
    },
    {
      field: "id",
      headerName: "Order Item ID",
      width: 150,
      hide: true,
    },
  ];

  const [rows, setRows] = useState([]);

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
      } catch (error) {}
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
            {translate("echtzeitkiosk.previous_orders.name")}
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
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
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

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";

import { useTranslate } from "react-admin";

import { Box, Button, Card, Typography } from "@mui/material";

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
      headerName: translate("echtzeitkiosk.customer_invoices.month_year"),
      width: 100,
    },
    {
      field: "total",

      headerName: translate("echtzeitkiosk.customer_invoices.total"),
      width: 150,
    },
    {
      field: "user",

      headerName: translate("echtzeitkiosk.customer_invoices.user"),
      width: 300,
    },
    {
      field: "currentUserBalance",
      headerName: translate(
        "echtzeitkiosk.customer_invoices.current_user_balance"
      ),

      width: 200,
    },
    {
      field: "customerInvoiceType",
      headerName: translate("echtzeitkiosk.customer_invoices.type"),
      width: 100,
    },
    {
      field: "createdAt",
      headerName: translate("resources.customers.fields.created_at"),
      width: 200,
    },
    {
      field: "Download",
      headerName: translate("echtzeitkiosk.customer_invoices.download"),
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              window.open(
                `${API_URL}/customer-invoices/${params.row.id}/generate-customer-invoice-pdf`,
                "_blank"
              );
            }}
          >
            {/* {translate("echtzeitkiosk.buttons.download_pdf")} */}
            <PictureAsPdfIcon />
            <DownloadIcon />
          </Button>
        );
      },
    },
  ];

  const [rows, setRows] = useState([]);

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
            customerInvoiceMonthYear: customerInvoice.customerInvoiceMonthYear,
            customerInvoiceType: customerInvoice.customerInvoiceType,
            total: customerInvoice.total,
            user: customerInvoice.user.email,
            currentUserBalance: customerInvoice.currentUserBalance,
          });
        });

        setRows(customerInvoicesToDisplay);
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
          marginBottom: "2em",
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
            pageSize={10}
            rowsPerPageOptions={[10]}
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

CustomerInvoices.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default CustomerInvoices;

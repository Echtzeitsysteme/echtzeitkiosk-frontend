import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import HelpIcon from "@mui/icons-material/Help";

import axios from "axios";

import Swal from "sweetalert2";

import { useTranslate } from "react-admin";

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

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rows, setRows] = useState([]);

  const translate = useTranslate();

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: translate("resources.customers.fields.first_name"),
      width: 150,
    },
    {
      field: "lastName",
      headerName: translate("resources.customers.fields.last_name"),
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "username",
      headerName: translate("resources.customers.fields.user_name"),
      width: 150,
    },
    {
      field: "isApproved",
      headerName: translate("resources.customers.fields.is_approved"),
      width: 220,
      renderCell: (params: any) => {
        return params.value ? (
          translate("echtzeitkiosk.feedback.success.approved")
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
              {translate("resources.customers.fields.approval")}
            </Button>

            <Button
              sx={{ marginLeft: "1rem" }}
              variant="contained"
              color="error"
              onClick={(event) => {
                handleDeclineRegistration(event, params);
              }}
            >
              {translate("resources.customers.fields.non_approval")}
            </Button>
          </>
        );
      },
    },
    {
      field: "isEmailVerified",
      headerName: translate("resources.customers.fields.mail_verified"),
      width: 150,
      renderCell: (params: any) => {
        return params.value
          ? translate("resources.customers.fields.is_verified")
          : translate("resources.customers.fields.is_not_verified");
      },
    },
    {
      field: "createdAt",
      headerName: translate("resources.customers.fields.created_at"),
      width: 200,
    },
    {
      field: "balance",
      headerName: translate("resources.customers.fields.balance"),
      width: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
            >
              <Typography variant="body2">{params.value}</Typography>
              <Button
                sx={{ marginLeft: "1rem" }}
                variant="contained"
                color="primary"
                onClick={(event) => {
                  handleUpdateBalance(event, params);
                }}
              >
                {translate("echtzeitkiosk.buttons.update")}
              </Button>
            </Box>
          </>
        );
      },
    },
    {
      field: "Delete",
      hideSortIcons: true,
      filterable: false,
      sortable: false,
      headerName: translate("echtzeitkiosk.products.delete_option"),
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              sx={{ marginLeft: "1rem" }}
              variant="contained"
              color="error"
              onClick={(event) => {
                Swal.fire({
                  title: translate("echtzeitkiosk.feedback.warning.title"),
                  text: translate("echtzeitkiosk.feedback.warning.text"),
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: translate("echtzeitkiosk.buttons.yes"),
                  cancelButtonText: translate("echtzeitkiosk.buttons.no"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteUser(event, params);
                  }
                });
              }}
            >
              {translate("echtzeitkiosk.buttons.delete")}
            </Button>
          </>
        );
      },
    },
    {
      field: "Send Invoice",
      hideSortIcons: true,
      filterable: false,
      sortable: false,

      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Typography variant="body1">
            {translate("echtzeitkiosk.buttons.send_invoice")}
          </Typography>
          <HelpIcon
            sx={{
              color: "red",
              fontSize: "1.5rem",
              marginLeft: "1rem",
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
        </Box>
      ),

      width: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              sx={{ marginLeft: "1rem" }}
              variant="contained"
              color="error"
              onClick={(event) => {
                Swal.fire({
                  title: translate("echtzeitkiosk.feedback.warning.title"),
                  text: translate("echtzeitkiosk.feedback.warning.text"),
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: translate("echtzeitkiosk.buttons.yes"),
                  cancelButtonText: translate("echtzeitkiosk.buttons.no"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleSendInvoice(event, params);
                  }
                });
              }}
            >
              {translate("echtzeitkiosk.buttons.send_invoice")}
            </Button>
          </>
        );
      },
    },
  ];

  // const rows: GridRowsProp = [];

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

        console.log(data);
        // => format=json&option=value

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
      title: translate("echtzeitkiosk.balance.update"),
      text: translate("echtzeitkiosk.balance.update_descr"),
      input: "text",
      inputPlaceholder: translate("echtzeitkiosk.balance.update_placeholder"),
      showCancelButton: true,
      cancelButtonText: translate("echtzeitkiosk.buttons.cancel"),
      confirmButtonText: translate("echtzeitkiosk.buttons.update"),
      showLoaderOnConfirm: true,
      preConfirm: (balance) => {
        updateBalance(balance, params.row.id);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).finally(() => {
      window.location.reload();
    });
  };

  const handleApproveRegistration = async (event: any, params: any) => {
    console.log("handleApproveRegistration", params);

    const callAPI = async () => {
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

    await callAPI();

    window.location.reload();
  };

  const handleDeclineRegistration = async (event: any, params: any) => {
    console.log("handleDeclineRegistration", params);

    const callAPI = async () => {
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

    await callAPI();

    window.location.reload();
  };

  const handleDeleteUser = async (event: any, params: any) => {
    console.log("handleDeleteUser", params);

    const callAPI = async () => {
      try {
        const resp = await axios({
          method: "DELETE",
          url: `${API_URL}/users/` + params.row.id,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {}
    };

    await callAPI();

    window.location.reload();
  };

  const handleSendInvoice = async (event: any, params: any) => {
    const callAPI = async () => {
      try {
        const options = {
          method: "POST",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          url: `${API_URL}/customer-invoices/send-to/` + params.row.id,
        };

        const resp = await axios(options);

        if (resp.status === 200) {
          Swal.fire({
            title: translate("echtzeitkiosk.feedback.success"),
            text: translate("echtzeitkiosk.feedback.invoice_sent"),
            icon: "success",
            confirmButtonText: translate("echtzeitkiosk.buttons.ok"),
          });
        }
      } catch (error) {}
    };

    await callAPI();

    window.location.reload();
  };

  // ----------------

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
          return user.role !== "SUPERUSER";
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
          justifyContent: "space-between",
          alignItems: "center",
          minWidth: "95vw",
          minHeight: "70vh",
          // height: "80%",
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
            padding: "1em",
          }}
        >
          <Typography variant="h5">
            {translate("resources.users.name")}
          </Typography>

          <Box
            sx={{
              // padding: "1em",
              // minHeight: "300%",
              minWidth: "90vw",
              minHeight: "80vh",
              height: "100%",
            }}
          >
            <DataGrid
              sx={{ minWidth: "90vw", minHeight: "80vh" }}
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
        </Box>
      </Card>
    </Box>
  );
};

Users.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default Users;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  DataGrid,
  GridRowModel,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import axios from "axios";

import Swal from "sweetalert2";

import { useTranslate } from "react-admin";

import {
  Box,
  Button,
  Card,
  Typography,
  Avatar,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Alert, { AlertProps } from "@mui/material/Alert";

import { API_URL } from "../../../utils/API_URL";

const Products = () => {
  const [rows, setRows] = useState([]);

  const translate = useTranslate();

  const columns: GridColDef[] = [
    {
      field: "productTitle",
      headerName: translate("echtzeitkiosk.products.product_title"),
      width: 200,
      editable: true,
    },
    {
      field: "quantity",
      headerName: translate("echtzeitkiosk.products.quantity"),
      width: 100,
      editable: true,
    },
    {
      field: "productPhotoUrl",
      headerName: translate("echtzeitkiosk.products.photo_url"),
      width: 200,
      editable: true,
      renderCell: (params: any) => {
        return params.value === "null" || !params.value ? (
          "-"
        ) : (
          <>
            <Avatar
              sx={{
                width: 40,
                height: 40,
              }}
              src={params.row.productPhotoUrl}
            />
          </>
        );
      },
    },
    {
      field: "createdAt",
      headerName: translate("echtzeitkiosk.products.created_at"),
      width: 200,
      editable: true,
    },
    {
      field: "resalePricePerUnit",
      headerName: translate("echtzeitkiosk.products.unit_price"),
      width: 150,
      editable: true,
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
                    handleDeleteProduct(event, params);
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
  ];

  const handleDeleteProduct = async (event: any, params: any) => {
    const callAPI = async () => {
      try {
        const resp = await axios({
          method: "DELETE",
          url: `${API_URL}/products/` + params.row.id,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {}
    };

    await callAPI();

    window.location.reload();
  };

  const handleUpdateProduct = async (params: any) => {
    const updateProduct = async (
      id,
      productTitle,
      resalePricePerUnit,
      quantity,
      productPhotoUrl
    ) => {
      try {
        const urlParams = {
          productTitle,
          resalePricePerUnit,
          quantity,
          productPhotoUrl,
        };

        const data = Object.keys(urlParams)
          .map((key) => `${key}=${encodeURIComponent(urlParams[key])}`)
          .join("&");

        console.log(data);

        const options = {
          method: "PATCH",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `${localStorage.getItem("token")}`,
          },

          data,
          url: `${API_URL}/products/` + id,
        };

        const resp = await axios(options);
      } catch (error) {}
    };

    await updateProduct(
      params.id,
      params.productTitle,
      params.resalePricePerUnit,
      params.quantity,
      params.productPhotoUrl
    );
  };

  function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
    if (newRow.productTitle !== oldRow.productTitle) {
      return `${translate("echtzeitkiosk.products.product_title")}  ${translate(
        "from"
      )} '${oldRow.productTitle}' ${translate("to")} '${newRow.productTitle}'`;
    }
    if (newRow.resalePricePerUnit !== oldRow.resalePricePerUnit) {
      return `${translate("echtzeitkiosk.products.unit_price")}  ${translate(
        "from"
      )} '${oldRow.resalePricePerUnit || ""}' ${translate("to")} '${
        newRow.resalePricePerUnit || ""
      }'`;
    }

    if (newRow.quantity !== oldRow.quantity) {
      return `${translate("echtzeitkiosk.products.quantity")} ${translate(
        "from"
      )}  '${oldRow.quantity}' ${translate("to")}  '${newRow.quantity}'`;
    }
    if (newRow.productPhotoUrl !== oldRow.productPhotoUrl) {
      return `${translate("echtzeitkiosk.products.photo_url")} ${translate(
        "from"
      )} '${oldRow.productPhotoUrl || ""}' ${translate("to")}  '${
        newRow.productPhotoUrl || ""
      }'`;
    }

    return null;
  }

  // ----------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios({
          method: "GET",
          url: `${API_URL}/products`,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        const data: [] = await resp?.data.data;

        const products = data;
        setRows(products);
        console.log(products);
      } catch (error) {}
    };

    fetchData();
  }, []);

  // const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = React.useState<any>(null);

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      console.log("newRow", newRow);

      const response = await handleUpdateProduct(newRow);

      setSnackbar({
        children: "Product successfully saved",
        severity: "success",
      });
      resolve(response);
      setPromiseArguments(null);
      window.location.reload();
    } catch (error) {
      setSnackbar({ children: "Fields can't be empty", severity: "error" });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>
          {translate("echtzeitkiosk.feedback.question.sure")}
        </DialogTitle>
        <DialogContent dividers>
          {`${translate(
            "echtzeitkiosk.feedback.question.sure_yes"
          )} ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            {translate("echtzeitkiosk.buttons.no")}
          </Button>
          <Button onClick={handleYes}>
            {translate("echtzeitkiosk.buttons.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

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
          alignItems: "center",
          minWidth: "95vw",
          minHeight: "85vh",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1em",
            }}
          >
            <Typography variant="h5">
              {translate("echtzeitkiosk.products.title")}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // open a dialog to add a new product
                (async () => {
                  const { value: formValues } = await Swal.fire({
                    title: translate("echtzeitkiosk.buttons.create_product"),
                    html:
                      `<input type="text" id="swal-input1" class="swal2-input" placeholder="${translate(
                        "echtzeitkiosk.products.product_title"
                      )}">` +
                      `<input type="number" id="swal-input2" class="swal2-input" placeholder="${translate(
                        "echtzeitkiosk.products.unit_price"
                      )}">` +
                      `<input type="number" id="swal-input3" class="swal2-input" placeholder="${translate(
                        "echtzeitkiosk.products.quantity"
                      )}">` +
                      `<input type="url" id="swal-input4" class="swal2-input" placeholder="${translate(
                        "echtzeitkiosk.products.photo_url"
                      )}">`,
                    focusConfirm: false,
                    preConfirm: () => {
                      const productTitle = (
                        Swal.getPopup().querySelector(
                          "#swal-input1"
                        ) as HTMLInputElement
                      ).value;
                      const resalePricePerUnit = (
                        Swal.getPopup().querySelector(
                          "#swal-input2"
                        ) as HTMLInputElement
                      ).value;
                      const quantity = (
                        Swal.getPopup().querySelector(
                          "#swal-input3"
                        ) as HTMLInputElement
                      ).value;
                      const productPhotoUrl = (
                        Swal.getPopup().querySelector(
                          "#swal-input4"
                        ) as HTMLInputElement
                      ).value;

                      return {
                        productTitle,
                        resalePricePerUnit,
                        quantity,
                        productPhotoUrl,
                      };
                    },
                  });

                  if (formValues) {
                    const {
                      productTitle,
                      resalePricePerUnit,
                      quantity,
                      productPhotoUrl,
                    } = formValues;

                    const urlParams = {
                      productTitle,
                      resalePricePerUnit,
                      quantity,
                      productPhotoUrl,
                    };

                    const data = Object.keys(urlParams)
                      .map(
                        (key) => `${key}=${encodeURIComponent(urlParams[key])}`
                      )
                      .join("&");

                    let response;
                    try {
                      response = await axios({
                        method: "POST",
                        url: `${API_URL}/products`,
                        headers: {
                          Authorization: `${localStorage.getItem("token")}`,
                        },
                        data,
                      });
                      // throw new Error("Testerror");
                    } catch (error) {
                      await Swal.fire({
                        title: "Error",
                        text: `${translate(
                          "echtzeitkiosk.feedback.errors.something_wrong"
                        )}
                              ${error}`,

                        icon: "error",
                      });
                      window.location.reload();
                    }

                    if (response.status === 200) {
                      await Swal.fire({
                        title: translate(
                          "echtzeitkiosk.feedback.success.product_saved"
                        ),
                        icon: "success",
                      });
                      window.location.reload();
                    } else {
                      await Swal.fire({
                        title: "Error",
                        text: `${translate(
                          "echtzeitkiosk.feedback.errors.something_wrong"
                        )}
                              ${response}`,
                        icon: "error",
                      });
                      window.location.reload();
                    }
                  }
                })();
              }}
            >
              {translate("echtzeitkiosk.buttons.create_product")}
            </Button>
          </Box>

          <Box
            sx={{
              // padding: "1em",
              // minHeight: "300%",
              minWidth: "90vw",
              minHeight: "70vh",
            }}
          >
            <div style={{ height: "100%", width: "100%" }}>
              {renderConfirmDialog()}
              <DataGrid
                sx={{ minWidth: "88vw", minHeight: "70vh" }}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
              />
              {!!snackbar && (
                <Snackbar
                  open
                  onClose={handleCloseSnackbar}
                  autoHideDuration={6000}
                >
                  <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
              )}
            </div>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

Products.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default Products;

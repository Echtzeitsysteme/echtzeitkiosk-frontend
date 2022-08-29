import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridRowModel,
  GridColumns,
  GridRowId,
  GridRowsProp,
  GridColDef,
} from "@mui/x-data-grid";
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
  Avatar,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Alert, { AlertProps } from "@mui/material/Alert";

import { API_URL } from "../../../utils/API_URL";

const columns: GridColDef[] = [
  {
    field: "productTitle",
    headerName: "Product Title",
    width: 200,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
    editable: true,
  },
  {
    field: "productPhotoUrl",
    //   headerName: translate("resources.users.email"),
    headerName: "Product Photo URL",
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
    //   headerName: translate("resources.users.createdAt"),
    headerName: "Created At",

    width: 200,
    editable: true,
  },
  {
    field: "resalePricePerUnit",
    //   headerName: translate("resources.users.balance"),
    headerName: "Unit Price (EUR)",
    width: 150,
    editable: true,
  },
  {
    field: "DELETE!",
    headerName: "DELETE!",
    width: 100,
    renderCell: (params: any) => {
      return (
        <>
          <Button
            sx={{ marginLeft: "1rem" }}
            variant="contained"
            color="error"
            onClick={(event) => {
              handleDeleteProduct(event, params);
            }}
          >
            Delete
          </Button>
        </>
      );
    },
  },
  // {
  //   field: "UPDATE!",
  //   headerName: "UPDATE!",
  //   width: 100,
  //   renderCell: (params: any) => {
  //     return (
  //       <>
  //         <Button
  //           sx={{ marginLeft: "1rem" }}
  //           variant="contained"
  //           color="warning"
  //           onClick={(event) => {
  //             handleUpdateProduct(event, params);
  //           }}
  //         >
  //           Update
  //         </Button>
  //       </>
  //     );
  //   },
  // },
];

const rows: GridRowsProp = [];

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

// const handleCreateProduct = async (formValues: object): object => {
//   const callAPI = async (formValues): Promise<any> => {
//     try {
//       const { productTitle, quantity, productPhotoUrl, resalePricePerUnit } =
//         formValues;

//       const urlParams = {
//         productTitle,
//         resalePricePerUnit,
//         quantity,
//         productPhotoUrl,
//       };

//       const data = Object.keys(urlParams)
//         .map((key) => `${key}=${encodeURIComponent(urlParams[key])}`)
//         .join("&");

//       console.log(data);

//       const resp = await axios({
//         method: "POST",
//         url: `${API_URL}/products`,
//         headers: {
//           Authorization: `${localStorage.getItem("token")}`,
//         },
//         data,
//       });

//       return resp;
//     } catch (error) {
//       return error;
//     }
//   };
//   const result = await callAPI(formValues);

//   return result;
// };

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
    return `productTitle from '${oldRow.productTitle}' to '${newRow.productTitle}'`;
  }
  if (newRow.resalePricePerUnit !== oldRow.resalePricePerUnit) {
    return `resalePricePerUnit from '${oldRow.resalePricePerUnit || ""}' to '${
      newRow.resalePricePerUnit || ""
    }'`;
  }

  if (newRow.quantity !== oldRow.quantity) {
    return `quantity from '${oldRow.quantity}' to '${newRow.quantity}'`;
  }
  if (newRow.productPhotoUrl !== oldRow.productPhotoUrl) {
    return `productPhotoUrl from '${oldRow.productPhotoUrl || ""}' to '${
      newRow.productPhotoUrl || ""
    }'`;
  }

  return null;
}

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rows, setRows] = useState([]);

  const translate = useTranslate();
  const notify = useNotify();
  const navigate = useNavigate();

  const productTitleRef = useRef<HTMLInputElement>(null);
  const resalePricePerUnitRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const productPhotoUrlRef = useRef<HTMLInputElement>(null);

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

        setLoading(false);
        setIsSuccess(true);

        const products = data;
        setRows(products);
        console.log(products);
      } catch (error) {
        // setServerError(error);
        setLoading(false);
      }
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
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",

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
          minWidth: "95vw",
          minHeight: "50vh",
          marginTop: "8em",
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
          <Box
            sx={{
              // width: "30%",
              // height: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1em",
            }}
          >
            <Typography variant="h5">PRODUCTS</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // open a dialog to add a new product
                (async () => {
                  const { value: formValues } = await Swal.fire({
                    title: "Create New Product",
                    html:
                      `<input type="text" id="swal-input1" class="swal2-input" placeholder="Product Title">` +
                      `<input type="number" id="swal-input2" class="swal2-input" placeholder="Resale Price per Unit">` +
                      `<input type="number" id="swal-input3" class="swal2-input" placeholder="Quantity">` +
                      `<input type="url" id="swal-input4" class="swal2-input" placeholder="Photo URL">`,
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
                    } catch (error) {
                      await Swal.fire({
                        title: "Error",
                        text: `Something went wrong. Error:
                              ${error}`,

                        icon: "error",
                      });
                      window.location.reload();
                    }

                    if (response.status === 200) {
                      await Swal.fire({
                        title: "Product successfully saved",
                        icon: "success",
                      });
                      window.location.reload();
                    } else {
                      await Swal.fire({
                        title: "Error",
                        text: `Something went wrong:
                              ${response}`,
                        icon: "error",
                      });
                      window.location.reload();
                    }
                  }
                })();
              }}
            >
              Create New Product
            </Button>
          </Box>

          <Box
            sx={{
              padding: "1em",
              // minHeight: "300%",
              minWidth: "90vw",
              minHeight: "50vh",
            }}
          >
            <div style={{ height: "100%", width: "100%" }}>
              {renderConfirmDialog()}
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
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

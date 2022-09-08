import { useEffect, useState, useCallback } from "react";
import // Title,
// useGetList,
// Datagrid,
// NumberField,
// DateField,
// TextField as TextFieldReactAdmin,
"react-admin";
import {
  Alert,
  Card,
  Container,
  Box,
  Button,
  Toolbar,
  TextField,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import EuroIcon from "@mui/icons-material/Euro";

import Swal from "sweetalert2";
import axios from "axios";
// import { useFetch } from "usehooks-ts";

import {
  total,
  add,
  get,
  destroy,
  onChange,
  list,
  quantity,
  remove,
} from "cart-localstorage";

import { API_URL } from "../../../utils/API_URL";
import {
  exampleProductsData,
  exampleProductsData2,
} from "../../../utils/productsMockData";

interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  comment: string;
  productTitle: string;
  productType: number;
  productCategory: number;
  quantity: number;
  productPhotoUrl: string;
  resalePricePerUnit: number;
}

const ShoppingCart = () => {
  const [cart, setCart] = useState(() => {
    let cart = list();
    return cart || null;
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL + "/products", {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        const editedData = data.data.map((product) => ({
          id: product.id,
          price: product.resalePricePerUnit,
          productTitle: product.productTitle,
          quantity: product.quantity,
          productPhotoUrl: product.productPhotoUrl,
        }));

        setProducts(editedData);

        setLoading(false);
      } catch (e) {
        console.log("Failed fetchProducts", e);
        setLoading(false);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [onChange(setCart)]);

  const handleCheckout = async () => {
    const body = {
      customerOrderItems: cart
        .map((item) => {
          return {
            productId: item.id,
            quantity: item.quantity,
          };
        })
        .filter((item) => item.quantity > 0),
    };
    try {
      const resp = await axios({
        method: "POST",
        url: `${API_URL}/customer-orders`,
        data: body,
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const data: any = await resp?.data.data;

      destroy();
      Swal.fire("Current balance:", `${data?.balanceAfterOrder}`, "success");

      window.location.reload();
    } catch (error) {}
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg" sx={{
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          minWidth: "85vw",
        }}>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Products
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: "100%",
                  flexWrap: "wrap",
                }}
              >
                {products.map(
                  (product) =>
                    product.quantity !== 0 && (
                      <Card
                        key={product.id}
                        sx={{
                          mx: 2,
                          my: 2,
                          maxWidth: "40vh",

                          borderRadius: "1rem",
                          boxShadow:
                            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                        }}
                      >
                        {product.productPhotoUrl && (
                          <CardMedia
                            sx={{
                              maxHeight: "10rem",
                              maxWidth: "10rem",
                            }}
                            component="img"
                            height="auto"
                            width="auto"
                            image={
                              product.productPhotoUrl !== "null" // TODO fix
                                ? product.productPhotoUrl
                                : "https://via.placeholder.com/150"
                            }
                          />
                        )}
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {product.productTitle}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {product.price}€
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {product.quantity} left
                          </Typography>
                        </CardContent>
                        <CardActions
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            maxWidth: "100%",
                            flexWrap: "wrap",
                          }}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            color="warning"
                            onClick={() => {
                              quantity(product.id, -1);
                            }}
                          >
                            <RemoveShoppingCartIcon />
                          </Button>
                          {get(product.id) && (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography variant="body1">In Cart:</Typography>

                              <Typography variant="h6" fontWeight="bold">
                                {get(product.id).quantity.toString()}
                              </Typography>
                            </Box>
                          )}
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => {
                              add(product);
                            }}
                          >
                            <AddShoppingCartIcon />
                          </Button>
                        </CardActions>
                      </Card>
                    )
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "3rem",
                }}
              >
                <Typography variant="h4" component="h1" gutterBottom>
                  Cart
                </Typography>
                {/* <Spacer /> */}
                <Typography
                  variant="h6"
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                >
                  Total: {total().toFixed(2)} €
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {list().length !== 0 && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price(€)</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Subtotal(€)</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {list().map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.productTitle}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>
                            {(product.price * product.quantity).toFixed(2)}
                          </TableCell>
                          {/* // add increment and decrement buttons */}
                          <TableCell>
                            <Button
                              sx={{
                                margin: "0.5rem",
                              }}
                              variant="contained"
                              color="warning"
                              onClick={() => {
                                quantity(product.id, -1);
                              }}
                            >
                              <RemoveShoppingCartIcon />
                            </Button>
                            <Button
                              sx={{
                                margin: "0.5rem",
                              }}
                              variant="contained"
                              color="success"
                              onClick={() => {
                                add(product);
                              }}
                            >
                              <AddShoppingCartIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {list().length !== 0 && (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                  sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                  }}
                  marginTop="2rem"
                >
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      destroy();
                    }}
                  >
                    <DeleteForeverIcon />
                  </Button>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={handleCheckout}
                  >
                    <ShoppingCartCheckoutIcon />
                    <EuroIcon />
                  </Button>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        </Container>
      </Box>
    </>
  );
};

export default ShoppingCart;

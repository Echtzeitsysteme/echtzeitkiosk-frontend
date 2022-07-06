import { useEffect, useState } from "react";
import {
  Title,
  useGetList,
  Datagrid,
  NumberField,
  DateField,
  TextField as TextFieldReactAdmin,
} from "react-admin";
import { Card, Button, Toolbar, TextField } from "@mui/material";
import axios from "axios";
import { total, add, get } from "cart-localstorage";

const ShoppingCart = () => {
  return <>Shopping cart will come here. Total: {total()}</>;
};

export default ShoppingCart;
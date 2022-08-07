import { useEffect, useState } from "react";
import {
  Title,
  useGetList,
  Datagrid,
  NumberField,
  useRecordContext,
  DateField,
  TextField as TextFieldReactAdmin,
} from "react-admin";
import { Card, Button, Toolbar, TextField } from "@mui/material";
import axios from "axios";
import { add, get } from "cart-localstorage";
import { API_URL } from "../utils/API_URL";

const useFetchList = (method: any, url: any, body: any, options?: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState(0);
  // const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios({
          method: method,
          url: url,
          data: body,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        const data: [] = await resp?.data.data;

        setResult(data);
        setTotal(data.length);
        setIsLoading(false);
      } catch (error) {
        // setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  console.log("useFetchList", {
    method,
    url,
    body,
    isLoading,
    result,
    total,
  });
  return { isLoading, result, total };
};

const AddToCartButton = () => {
  const record = useRecordContext();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        console.log("add to cart");
        console.log("record", record);
        add(record);

        console.log("added:", get());
      }}
    >
      Add to cart
    </Button>
  );
};

const ShoppingTable = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const sort = { field: "productTitle", order: "ASC" };
  // const { data, total, isLoading } = useGetList('books', {
  //     filter: { q: filter },
  //     pagination: { page, perPage },
  //     sort,
  // });

  const {
    result: data,
    total,
    isLoading,
  } = useFetchList(
    "GET",
    `${API_URL}/products`,
    null
    // {
    //     filter: { q: filter },
    //     pagination: { page, perPage },
    //     sort,
    // }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Title title="Products List" />
      {/* <TextField
                label="Search products"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                variant="filled"
                size="small"
                margin="dense"
            /> */}
      <Card>
        <Datagrid data={data} sort={sort}>
          {/* <TextFieldReactAdmin source="id" /> */}
          {/* <DateField source="createdAt" /> */}
          {/* <DateField source="updatedAt" /> */}
          {/* <TextFieldReactAdmin source="comment" /> */}
          <TextFieldReactAdmin source="productTitle" />
          {/* <NumberField source="productType" /> */}
          <NumberField source="productCategory" />
          <NumberField source="quantity" />
          <TextFieldReactAdmin source="productPhotoUrl" />
          <NumberField source="resalePricePerUnit" />

          <AddToCartButton />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              console.log("bought");
            }}
          >
            Buy now
          </Button>
        </Datagrid>
      </Card>
      <Toolbar>
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)}>Previous page</Button>
        )}
        {page < (total || 0) / perPage && (
          <Button onClick={() => setPage(page + 1)}>Next page</Button>
        )}
      </Toolbar>
    </div>
  );
};

export default ShoppingTable;

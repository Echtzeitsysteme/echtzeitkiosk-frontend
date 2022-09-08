import { CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";

import ShoppingCart from "./ShoppingCart";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;

const CustomerDashboard = () => {
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return (
    <div style={styles.flexColumn as CSSProperties}>
      <div style={styles.singleCol}>
        <ShoppingCart />
      </div>
    </div>
  );
};

export default CustomerDashboard;

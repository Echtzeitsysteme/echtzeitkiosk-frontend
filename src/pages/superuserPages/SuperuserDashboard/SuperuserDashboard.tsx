import { CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";

import RecentRegistrations from "../../../components/superuserComponents/RecentRegistrations";
import PreviousOrders from "../../../components/commonComponents/PreviousOrders";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;

const Dashboard = () => {
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return isXSmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <RecentRegistrations />
        <Spacer />
        <PreviousOrders />
        {/* <WelcomeSuperuser />
        <WelcomeSuperuser />
        <VerticalSpacer />
        <WelcomeSuperuser />
        <VerticalSpacer />
        <WelcomeSuperuser /> */}
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>
      <RecentRegistrations />
      <Spacer />
      <PreviousOrders />
      {/* <div style={styles.singleCol}>
        <WelcomeSuperuser />
      </div>
      <div style={styles.flex}>
        <WelcomeSuperuser />
        <Spacer />
        <WelcomeSuperuser />
      </div>
      <div style={styles.singleCol}>
        <WelcomeSuperuser />
      </div>
      <div style={styles.singleCol}>
        <WelcomeSuperuser />
      </div> */}
    </div>
  ) : (
    <>
      <RecentRegistrations />
      <Spacer />
      <PreviousOrders />
      {/* <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <WelcomeSuperuser />
            <Spacer />
            <WelcomeSuperuser />
          </div>
          <div style={styles.singleCol}>
            <WelcomeSuperuser />
          </div>
          <div style={styles.singleCol}>
            <WelcomeSuperuser />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <WelcomeSuperuser />
            <Spacer />
            <WelcomeSuperuser />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Dashboard;

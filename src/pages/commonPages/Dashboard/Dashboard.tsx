import { useEffect, useState } from "react";
import { useGetIdentity } from "react-admin";

import { SuperuserDashboard } from "../../superuserPages/SuperuserDashboard";
import { CustomerDashboard } from "../../customerPages/CustomerDashboard";

const Dashboard = () => {
  const [userRole, setUserRole] = useState<any>();
  const { identity, isLoading: identityLoading } = useGetIdentity();

  useEffect(() => {
    if (identity) {
      setUserRole(identity.userRole);
    }
  }, [identity]);
  if (identityLoading) return <>Loading...</>;

  if (userRole === "SUPERUSER") {
    if (identityLoading) return <>Loading...</>;
    return <SuperuserDashboard />;
  }

  return (
    <>
      <CustomerDashboard />
    </>
  );
};

export default Dashboard;

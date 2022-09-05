import React, { useEffect, useState } from "react";
import { useGetIdentity, Resource, ListGuesser } from "react-admin";
import dataProvider from "../dataProvider";
import { SuperuserDashboard } from "../superuserDashboard";
import { CustomerDashboard } from "../customerDashboard";

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

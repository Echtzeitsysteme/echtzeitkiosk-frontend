import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import GroupIcon from "@mui/icons-material/Group";

import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
  useGetIdentity,
} from "react-admin";

import SubMenu from "./SubMenu";

type MenuName = "menuCatalog" | "menuSales" | "menuCustomers";

const Menu = ({ dense = false }: MenuProps) => {
  const [userRole, setUserRole] = useState<any>();
  const { identity, isLoading: identityLoading } = useGetIdentity();

  useEffect(() => {
    if (identity) {
      setUserRole(identity.userRole);
    }
  }, [identity]);

  const [state, setState] = useState({
    // menuCatalog: true,
    // menuSales: true,
    // menuCustomers: true,
  });
  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem />

      {userRole === "SUPERUSER" && (
        <MenuItemLink
          to="/users"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.users.name`, {
            smart_count: 2,
          })}
          leftIcon={<GroupIcon />}
          dense={dense}
        />
      )}

      {userRole === "SUPERUSER" && (
        <MenuItemLink
          to="/products"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.products.name`, {
            smart_count: 2,
          })}
          leftIcon={<WarehouseIcon />}
          dense={dense}
        />
      )}
    </Box>
  );
};

export default Menu;

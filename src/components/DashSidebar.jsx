import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div>
      <Link to="/dashboard?tab=admin-dashboard">
        <SidebarItem active={tab === "admin-dashboard" || !tab}>
          Dashboard
        </SidebarItem>
      </Link>
      <Link to="/dashboard?tab=manage-users">
        <SidebarItem active={tab === "manage-users" || !tab}>
          Users
        </SidebarItem>
      </Link>
      <Link to="/dashboard?tab=add-products">
        <SidebarItem active={tab === "add-products" || !tab}>
          Add Products
        </SidebarItem>
      </Link>
      <Link to="/dashboard?tab=manage-products">
        <SidebarItem active={tab === "manage-products" || !tab}>
          Manage Products
        </SidebarItem>
      </Link>
      <Link to="/dashboard?tab=app-customization">
        <SidebarItem active={tab === "app-customization" || !tab}>
          App Customization
        </SidebarItem>
      </Link>
    </div>
  );
};

export default DashSidebar;

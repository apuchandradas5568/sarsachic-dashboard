import React, { Children } from "react";

const SidebarItem = ({ active, children }) => {
  return (
    <div
      className={`${
        active ? "bg-gray-200" : "hover:bg-gray-200"
      } ' px-4 py-2 my-2 rounded-md cursor-pointer'`}
    >
      {children}
    </div>
  );
};

export default SidebarItem;

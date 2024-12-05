import React from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const SidebarItems = [
  {
    key: "4000",
    icon: React.createElement(UserOutlined),
    label: "Users",
    path: "/users",
  },
  {
    key: "5000",
    icon: React.createElement(DeleteOutlined),
    label: "Bins",
    path: "/bins",
  },
];

export default SidebarItems;

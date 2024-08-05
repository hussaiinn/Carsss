import React from "react";
import SidebarComponent from "../../components/sidebar";
import { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import List from "../../components/list";
import { useNavigate } from "react-router-dom";

const AdminDash = ({ data, mngreload, userlogin, adminlogin }) => {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  const { role } = useParams();
  console.log(role);
  console.log(adminlogin);

  const navigateto = () => {
    navigate("/");
  };
  return (
    <>
      <div className="app " style={{ display: "flex" }}>
        {role == "admin" ? <SidebarComponent /> : <></>}
        <List role={role} data={data} mngreload={mngreload} />
      </div>
    </>
  );
};

export default AdminDash;

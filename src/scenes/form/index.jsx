import React from "react";
import Form from "../../components/form";
import SidebarComponent from "../../components/sidebar";
import { useNavigate } from "react-router-dom";

const NewForm = ({ mngreload, userlogin, adminlogin }) => {
  const navigate = useNavigate();
  const navigateto = () => {
    navigate("/");
  };
  return (
    <>
      <div className="app " style={{ display: "flex" }}>
        <SidebarComponent />
        <Form mngreload={mngreload} />
      </div>
    </>
  );
};

export default NewForm;

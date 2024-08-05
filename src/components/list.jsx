import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Header from "./header";
import { act, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Button from "@mui/material";

const data1 = [
  { "car name": "Toyota Corolla", "manufacturing year": 2020, price: 20000 },
  { "car name": "Honda Civic", "manufacturing year": 2019, price: 22000 },
  { "car name": "Ford Focus", "manufacturing year": 2018, price: 18000 },
  { "car name": "Chevrolet Malibu", "manufacturing year": 2021, price: 25000 },
  { "car name": "BMW 3 Series", "manufacturing year": 2017, price: 30000 },
  { "car name": "Audi A4", "manufacturing year": 2022, price: 35000 },
  {
    "car name": "Mercedes-Benz C-Class",
    "manufacturing year": 2016,
    price: 28000,
  },
  { "car name": "Volkswagen Jetta", "manufacturing year": 2020, price: 21000 },
  { "car name": "Hyundai Elantra", "manufacturing year": 2018, price: 17000 },
  { "car name": "Nissan Sentra", "manufacturing year": 2019, price: 19000 },
];
const addSequentialIds = (data) => {
  if (data) {
    console.log("in");
    return data.map((item, index) => ({
      ...item,
      id: index + 1, // Sequential IDs starting from 1
    }));
  }
};

const List = ({ role, data, mngreload }) => {
  const [storeData, setStoredData] = useState();
  const navigate = useNavigate();
  const handleDeleteIcon = async (id, action) => {
    // alert(`Car Name: ${id}`);
    // if (action == "delete") {
    try {
      const response = await axios.delete(
        `http://localhost:3100/api/data/${id}`
      );
      console.log("Data deleted:", response.data);
      // Clear the form or handle successful submission
      alert("Your Data is deleted Successfully");
      mngreload();
    } catch (error) {
      console.error("Error saving data:", error);
    }
    // }
  };
  const handleUpdateIcon = async (id, action) => {
    // alert(`Car Name: ${id}`);
    // if (action == "delete") {
    navigate(`/form/update/${id}`);
    // }
  };

  const signOutto = () => {
    navigate("/");
  };
  useEffect(() => {
    const transformedData = addSequentialIds(data);
    setStoredData(transformedData);
    console.log(storeData);
    console.log("I am transformed data");
    console.log(transformedData);
  }, [data]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "car_name",
      headerName: "Car Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "manufacturing_year",
      headerName: "Manufacturing Year",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    ...(role == "admin"
      ? [
          {
            field: "actions",
            headerName: "Update",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (params) => (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="10px"
              >
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleUpdateIcon(params.row["_id"])}
                />
              </Box>
            ),
          },
          {
            field: "Actions",
            headerName: "Delete",
            headerAlign: "center",
            align: "center",
            width: 250,
            renderCell: (params) => (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="10px"
              >
                <DeleteSweepIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteIcon(params.row["_id"])}
                />
              </Box>
            ),
          },
        ]
      : []),
  ];

  return (
    <Box m="20px" width={role == "admin" ? "80%" : "100%"} pt="3rem">
      <Header
        title="CARS LIST"
        subtitle={
          role == "admin" ? "You can update and delete data from here" : ""
        }
      />
      {role == "user" ? (
        <Button
          sx={{
            background: colors.greenAccent[500],
            padding: "0.5rem 3rem",
            fontSize: "0.9rem",
            transition: "background 0.3s ease", // Optional: smooth transition effect
            "&:hover": {
              background: colors.greenAccent[200], // Change to red on hover
            },
          }}
          onClick={signOutto}
        >
          Sign out
        </Button>
      ) : (
        <></>
      )}
      <Box
        pt="0rem"
        m="40px 0 0 0"
        height="85vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {storeData ? (
          <DataGrid
            checkboxSelection
            rows={storeData}
            columns={columns}
            getRowId={(row) => row.id}
            components={{ Toolbar: GridToolbar }}
          />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default List;

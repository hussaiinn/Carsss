import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Form = ({ mngreload }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { action, id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    car_name: "",
    manufacturing_year: "",
    price: "",
  });

  const handleFormSubmit = async (values, {resetForm}) => {
    if (action === "new") {
      try {
        const response = await axios.post("http://localhost:3100/api/data", values);
        alert("Your Data is Saved Successfully");
        resetForm();
        mngreload();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else if (action === "update") {
      try {
        const response = await axios.put(`http://localhost:3100/api/data/${id}`, values);
        alert("Your Data is Updated Successfully");
        mngreload();
        navigate('/dash/admin')
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  useEffect(() => {
    if (action === "update") {
      axios.get(`http://localhost:3100/api/data/${id}`)
        .then((response) => {
          setInitialValues({
            car_name: response.data.car_name,
            manufacturing_year: response.data.manufacturing_year,
            price: response.data.price,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [action, id]);

  return (
    <Box m="20px" width="90%" height="95vh" pt="3rem">
      <Header
        title={action === "new" ? "Create new Record" : "Update Existing Record"}
        subtitle=""
      />

      <Formik
        enableReinitialize
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
              mt="5rem"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Car Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.car_name}
                name="car_name"
                error={!!touched.car_name && !!errors.car_name}
                helperText={touched.car_name && errors.car_name}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Manufacturing Year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.manufacturing_year}
                name="manufacturing_year"
                error={!!touched.manufacturing_year && !!errors.manufacturing_year}
                helperText={touched.manufacturing_year && errors.manufacturing_year}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 3" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="3rem" width="20%">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth
              >
                {action === "new" ? "Submit" : "Update"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  car_name: yup.string().required("Car name is required"),
  manufacturing_year: yup.number().required("Manufacturing year is required").positive().integer(),
  price: yup.number().required("Price is required").positive(),
});

export default Form;

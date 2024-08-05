import "./App.css";
import SignIn from "./components/signin";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminDash from "./scenes/dash";
import NewForm from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import getData from "./api/serviceapi";
import { useState, useEffect } from "react";
import NavigationGuard from "./components/NavigationGuard";

function App() {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [adminlogin, setadminlogin] = useState(false);
  const [userlogin, setuserlogin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
    setReload(false);
  }, [reload]);

  const manageReLoad = () => {
    setReload(true);
  };

  const setAdminLogin = () => {
    const adlog = adminlogin;
    setadminlogin(!adlog);
    console.log(!adminlogin);
  };

  const setUserLogin = () => {
    const uslogin = userlogin;
    setuserlogin(!uslogin);
    console.log(userlogin);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <BrowserRouter>
            <div className="App">
              <Routes>
                <Route
                  path="/"
                  element={
                    <SignIn setamdin={setAdminLogin} setuser={setUserLogin} />
                  }
                />
                <Route
                  path="/dash/:role"
                  element={
                    <AdminDash
                      data={data}
                      mngreload={manageReLoad}
                      userlogin={userlogin}
                      adminlogin={adminlogin}
                    />
                  }
                />
                <Route
                  path="/form/:action/:id?"
                  element={<NewForm mngreload={manageReLoad} userlogin={userlogin} adminlogin={adminlogin}/>}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import About from "./pages/About";
import Guests from "./pages/Guests";
import Inventory from "./pages/Inventory";

// Base code adapted from fsbnm: https://github.com/connor-a-francis/fsbnm

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#e6e6e7",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <div>
            <nav>
              <ul className="navbar-list">
                <li>
                  <Link to="/">About</Link>
                </li>
                <div className="nav-sep"></div>
                <li>
                  <Link to="/inventory">Inventory</Link>
                </li>
                <div className="nav-sep"></div>
                <li>
                  <Link to="/guests">Guests</Link>
                </li>
                <div className="nav-sep"></div>
                <li>
                  <Link to="/visits">Visits</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div id="page-container">
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/guests" element={<Guests />} />
            </Routes>
          </div>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;

import React, { useState } from "react";
import "./header.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const shapeStyles = { bgcolor: "#001eb9", width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: "50%" };
const rectangle = <Box component="span" sx={shapeStyles} />;
const circle = (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#54e346",
    },
  },
});

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <header className="header">
        <div className="logo" />
        <div className="user-dropdown">
          <div className="user-profile">
            <div className="dropdown">
              <Button
                className="dropdown-button"
                endIcon={<ArrowDropDownIcon className="dropdown-text" />}
                onClick={handleClick}
                style={{ color: "black" }}
              >
                ADMIN
              </Button>
              <Menu
                id="dropdownMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>ADMIN</MenuItem>
                <MenuItem onClick={handleClose}>USER</MenuItem>
              </Menu>
            </div>

            <Badge
              color="primary"
              overlap="circular"
              badgeContent=" "
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  top: "calc(68% + 6px)", // Adjust the value as per your preference
                },
              }}
            >
              {circle}
            </Badge>
          </div>
        </div>
      </header>
    </ThemeProvider>
  );
};

export default Header;

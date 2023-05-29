import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Box sx={{ backgroundColor: "#1abc9c", height: "100vh" }}>
      <Grid
        container
        sx={{ height: "100%" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item alignSelf="center">
          <Typography variant="h4" sx={{ color: "#ecf0f1" }}>
            Welcome to dashboard!
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#e74c3c", marginY: "20px" }}
              onClick={onLogout}
            >
              Logout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

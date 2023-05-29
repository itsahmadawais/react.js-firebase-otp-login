import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function Toast({
  show = false,
  message = "",
  type = "error",
  sx = { backgroundColor: "#f44336" },
  toastHandler,
}) {
  let alertProps = {};
  switch (type) {
    case "success":
      alertProps = {
        severity: "success",
      };
      break;
    default:
      alertProps = {
        severity: "error",
      };
  }

  let content = <Alert {...alertProps}>{message}</Alert>;

  return (
    <>
      <Snackbar open={show} autoHideDuration={1000} onClose={toastHandler}>
        {content}
      </Snackbar>
    </>
  );
}

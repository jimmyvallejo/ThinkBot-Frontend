import React from "react";
import { Button as MuiButton } from "@mui/material";
import { colors } from "../styles/colors";

const Button = (props) => {
  return (
    <MuiButton
      {...props}
      style={{
        background: colors.blues[500],
        textTransform: "none",
        color: "white",
        ...(props.style || {}),
      }}
      variant="outlined"
    >
      {props.children}
    </MuiButton>
  );
};

export default Button;

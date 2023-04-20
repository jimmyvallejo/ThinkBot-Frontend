import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { css } from "@emotion/react";

const StyledTextField = styled(TextField)(
  ({ theme }) => css`
    & div {
      border-radius: 20px;
    }
  `
);

const TextInput = (props) => {
  return <StyledTextField {...props} variant="outlined" />;
};

export default TextInput;

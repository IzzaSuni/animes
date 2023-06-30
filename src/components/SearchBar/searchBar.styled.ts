import styled from "@emotion/styled";
import { Autocomplete } from "@mui/material";
import { ReactComponent as SearchIconComponent } from "assets/icons/searchIcon/search-normal.svg";

export const SearchInput = styled(Autocomplete)`
  div {
    border-radius: 16px;
  }

  fieldset {
    border: 1px solid #e6e6e6 !important;
  }

  label {
    color: #6c6c6c !important;
  }
`;

export const SearchIcon = styled(SearchIconComponent)({
  position: "absolute",
  right: "8px",
});

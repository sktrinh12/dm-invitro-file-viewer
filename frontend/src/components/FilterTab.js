import * as React from "react";
import { Toolbar, InputAdornment, Drawer } from "@mui/material";
import Input from "./Input";
import SearchIcon from "@mui/icons-material/Search";

const styles = {
  position: "relative",
  marginRight: "auto",
  width: 200,
  "& .MuiBackdrop-root": {
    display: "none",
  },
  "& .MuiDrawer-paper": {
    width: 240,
    // position: "absolute",
    flexShrink: 0,
    height: 700,
    padding: "10px",
    marginTop: "90px",
  },
};

const inputStyles = {
  borderRadius: "2px",
  padding: "10px",
};

const FilterTab = ({ open, handleSearchFilter }) => {
  return (
    <Drawer open={open} sx={styles} variant="persistent" anchor="right">
      <Toolbar style={inputStyles}>
        <Input
          label="File Name"
          className={"width: 25%"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchFilter("FILE_NAME")}
        />
      </Toolbar>
    </Drawer>
  );
};

export default FilterTab;

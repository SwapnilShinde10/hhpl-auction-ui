import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";

export default function ColorModeSelect() {
  const [dark, setDark] = useState(false);

  return (
    <IconButton onClick={() => setDark(!dark)}>
      {dark ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

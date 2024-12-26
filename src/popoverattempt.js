import React, { useState } from "react";
import {
  Popover,
  IconButton,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <div>
      {/* Settings Cogwheel */}
      <IconButton
        color="inherit"
        onClick={handleSettingsClick}
        aria-controls="settings-popover"
        aria-haspopup="true"
      >
        <SettingsIcon />
      </IconButton>

      {/* Popover Menu */}
      <Popover
        id="settings-popover"
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleSettingsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            padding: "10px",
            maxWidth: "300px",
          },
        }}
      >
        {/* Popover Content */}
        <Typography variant="subtitle1" gutterBottom>
          Points Configuration
        </Typography>
        <Box>
          <Typography variant="body2">1st:</Typography>
          <TextField
            type="number"
            size="small"
            style={{ marginBottom: "10px", width: "100px" }}
          />
        </Box>
        <Box>
          <Typography variant="body2">2nd:</Typography>
          <TextField
            type="number"
            size="small"
            style={{ marginBottom: "10px", width: "100px" }}
          />
        </Box>
        <Box>
          <Typography variant="body2">Top4:</Typography>
          <TextField
            type="number"
            size="small"
            style={{ marginBottom: "10px", width: "100px" }}
          />
        </Box>
        <Box>
          <Typography variant="body2">Top8:</Typography>
          <TextField
            type="number"
            size="small"
            style={{ marginBottom: "10px", width: "100px" }}
          />
        </Box>
      </Popover>
    </div>
  );
}

export default App;

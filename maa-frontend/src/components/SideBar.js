import { Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

const drawerWidth = 170;

export default function SideBar() {
  const navigate = useNavigate();

  const handleListItems = text => {
    switch (text) {
    case "Local Search":
      navigate("/localSearch");
      break;
    case "Create/Remove Admin":
      navigate("/admin");
      break;
    default:
      navigate("/");
    }
  }

  return (
    <div style={{ position: "sticky" }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            ["& .MuiDrawer-paper"]: { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {["Create/Remove Admin", "Event Logging", "MBAPPS Report", "WhiteList/BlackList Configuration", "Local Search", "Weather Overlays", "Manage Services", "VIN Mock"].map((text) => (
                <>
                  <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => handleListItems(text)}>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    </div>
  );
}
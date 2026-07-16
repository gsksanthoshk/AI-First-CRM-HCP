import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { Box, Toolbar } from "@mui/material";

const drawerWidth = 240;

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
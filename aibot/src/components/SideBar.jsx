import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import GPTImage from "../assets/pictures/GPTBackgroundImage.png";
import chatIcon from "../assets/pictures/newChatIcon.png";
import CloseIcon from "@mui/icons-material/Close";

const SideBar = ({
  sidebarVisible,
  toggleSidebar,
  onNewChat,
  onPastChat,
}) => {
  return (
    <Box
    sx={{
      position: { xs: 'fixed', sm: 'relative' },
      top: 0,
      left: 0,
      minWidth: { xs: '100%', sm: '20%' },
      backgroundColor: '#FFFFFF',
      height: { xs: '100vh', sm: '90vh' },
      display: { xs: sidebarVisible ? 'block' : 'none', sm: 'block' },
      zIndex: 1200,
      overflowY: 'none',
    }}
    >
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          alignItems:"center",
          justifyContent: "space-between",
          p: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            color: "#9785BA",
            fontWeight: 700,
            marginLeft: 1.8,
          }}
        >
          Bot AI
        </Typography>
        <IconButton onClick={toggleSidebar}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1.8}
        sx={{
          cursor: "pointer",
          p: 2.0,
          background:
            "linear-gradient(0deg, #D7C7F4, #D7C7F4), linear-gradient(0deg, #D7C7F4, #D7C7F4),linear-gradient(0deg, #D7C7F4, #D7C7F4),linear-gradient(0deg, #D7C7F4, #D7C7F4);",
        }}
        onClick={onNewChat}
      >
        <img
          src={GPTImage}
          alt="Not Available"
          style={{ borderRadius: "50%" }}
          width="32px"
          height="32px"
        />
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
        >
          New Chat
        </Typography>
        <img src={chatIcon} alt="Not Available" width="27px" height="27px" />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            borderRadius:"30px",
            width: "85%",
            fontWeight: "bold",
            color:"#000000",
            background:
              "linear-gradient(0deg, #D7C7F4, #D7C7F4), linear-gradient(0deg, #D7C7F4, #D7C7F4),linear-gradient(0deg, #D7C7F4, #D7C7F4),linear-gradient(0deg, #D7C7F4, #D7C7F4);",
          }}
          onClick={onPastChat}
        >
          Past Conversations
        </Button>
      </Box>
    </Box>
  );
};

export default SideBar;

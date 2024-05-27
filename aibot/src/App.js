import "./App.css";
import { Box } from "@mui/material";
import { useState } from "react";
import ChatScreen from "./components/ChatScreen";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import PastConversation from "./components/PastConversation";

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isNewChat, setIsNewChat] = useState(true);
  const [isPastChat, setIsPastChat] = useState(false);
  const [chatData, setChatData] = useState([]);
  const savedData= JSON.parse(localStorage.getItem("chatData")) || [];

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNewChat = () => {
    setIsNewChat(true);
    setChatData([]);
    setIsPastChat(false);
  };

  const handlePastChat = () => {
    setIsNewChat(false);
    setIsPastChat(true);
  };

  return (
    
    <Box sx={{ display: "flex", height: "100vh" }}>
      {console.log(savedData)}
      <SideBar
        sidebarVisible={sidebarVisible}
        toggleSidebar={toggleSidebar}
        onNewChat={handleNewChat}
        onPastChat={handlePastChat}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Navbar toggleSidebar={toggleSidebar} />
        {isPastChat === true ? (
          <PastConversation savedData={savedData}/>
        ) : (
          <ChatScreen isNewChat={isNewChat} setIsNewChat={setIsNewChat} chatData={chatData} setChatData={setChatData}/>
        )}
      </Box>
    </Box>
  );
}

export default App;

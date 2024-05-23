import './App.css';
import {Box} from '@mui/material';
import {useState} from 'react';
import ChatScreen from './components/ChatScreen';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isNewChat, setIsNewChat] = useState(true);
  const [savedData, setSavedData] = useState([]);
  
  const toggleSidebar = () =>{
    setSidebarVisible(!sidebarVisible);
  };

  const handleNewChat = () =>{
    setIsNewChat(true);
  };

  const handlePastConversation = () => {
    const data = JSON.parse(localStorage.setItem("chatData")) || [];
    setSavedData(data);
    console.log(savedData);
    setIsNewChat(false);
  };

  return (
    <Box sx={{display:'flex', height:'100vh'}}>
      <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} onNewChat={handleNewChat} onPastConversation={handlePastConversation}/>
      <Box sx={{display:'flex', flexDirection:'column', flexGrow:1}}>
        <Navbar toggleSidebar={toggleSidebar}/>
        <ChatScreen isNewChat={isNewChat}/>
      </Box>
    </Box>
  );
}

export default App;

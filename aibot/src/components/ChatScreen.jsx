import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
// import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import GPTIcon from "../assets/pictures/GPTBackgroundImage.png";
import questions from "../assets/data/questions.json";
import responses from "../assets/data/aiReponseData.json";
import Feedback from "./Feedback";
// import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import yourImage from "../assets/pictures/ownImage.png";

const ChatScreen = ({ isNewChat }) => {
  const [userInput, setUserInput] = useState("");
  const [chatData, setChatData] = useState([]);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  const handleSubmit = () => {
    if (userInput) {
      const matchedReponse = responses.find(
        (item) => item.question.toLowerCase() === userInput.toLowerCase()
      );
      const response = matchedReponse
        ? matchedReponse.response
        : "Sorry, I don't have an answer for that.";
      setChatData([...chatData, { question: userInput, response }]);
      setUserInput("");
    }
  };

  const handleSave = () => {
    const savedData = JSON.parse(localStorage.getItem("chatData")) || [];
    const newData = [...savedData, ...chatData];
    localStorage.setItem("chatData", JSON.stringify(newData));
  };

  const handleFeedbackSubmit = (feedback) => {
    console.log(feedback);
    setOpenFeedbackModal(false);
  };

//   const handleDislikeClick = () => {
//     setOpenFeedbackModal(true);
//   };

  return (
    <Box
      sx={{
        p: 1.8,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)",
      }}
    >
      {!isNewChat ? (
        <>
          <Grid
            container
            spacing={2}
            sx={{ flex: "1 0 auto", display:'flex', alignItems:'flex-end' }}
          >
            {chatData.map((item, index) => (
              <Grid item xs={12} key={index} >
                <Box sx={{ backgroundColor: "#D7C7F4" , borderRadius:'5px', mb:1.5, display:'flex', alignItems:'center', padding:1.5}}>
                  <img
                    src={yourImage}
                    alt="Not Available"
                    width="40px"
                    height="40px"
                    style={{borderRadius:'50%'}}
                  />
                  <Box sx={{ml:1.5}} display="flex" flexDirection='column'> 
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px", fontWeight: "bold" }}
                    >
                      You
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "15px",
                        fontWeight: "400",
                        color: "#888888",
                      }}
                    >
                      Question......
                    </Typography>
                    <Typography variant="h6"
                      sx={{
                        fontSize: "10px",
                        fontWeight: "400",
                        color: "#888888",
                      }}>
                        Date...
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ backgroundColor: "#D7C7F4" , borderRadius:'5px', mb:2, display:'flex', alignItems:'center', padding:1.5}}>
                  <img
                    src={GPTIcon}
                    alt="Not Available"
                    width="40px"
                    height="40px"
                    style={{borderRadius:'50%'}}
                  />
                  <Box sx={{ml:1}}> 
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px", fontWeight: "bold" }}
                    >
                      Bot AI
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "15px",
                        fontWeight: "400",
                        color: "#888888",
                      }}
                    >
                      Answer......
                    </Typography>
                    <Typography variant="h6"
                      sx={{
                        fontSize: "10px",
                        fontWeight: "400",
                        color: "#888888",
                      }}>
                        Date...
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Box
            sx={{
              textAlign: "center",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: "1 0 auto",
              marginBottom: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontSize: "32px" }}>
              How Can I Help You Today?
            </Typography>
            <img
              src={GPTIcon}
              alt="Not Available"
              width="54px"
              height="54px"
              style={{
                borderRadius: "50%",
                marginTop: 9,
                boxShadow: "0px 0px 9px 0px #888888",
              }}
            />
          </Box>
          <Grid container spacing={2} sx={{ flexShrink: 0, mb: 2 }}>
            {questions.map((items, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{ backgroundColor: "#FFFFFF", p: 1.8, borderRadius: 1.8 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "16.2px", fontWeight: "bold" }}
                  >
                    {items.question}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontSize: "13.5px" }}
                  >
                    {items.subtitle}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mt: 1,
          flexShrink: 0,
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your question here..."
          sx={{
            mr: 1.8,
            boxShadow: "0px 0px 6.3px 0px",
            borderRadius: "4.5px",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            mr: 0.9,
            backgroundColor: "#D7C7F4",
            color: "#000000",
            fontWeight: "bold",
            fontSize: "14.4px",
            padding: "15px 40px",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              background: "none",
            },
          }}
          onClick={handleSubmit}
        >
          Ask
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mr: 0.9,
            backgroundColor: "#D7C7F4",
            color: "#000000",
            fontWeight: "bold",
            fontSize: "14.4px",
            padding: "15px 40px",
            "&:hover": {
              background: "none",
            },
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
      <Feedback
        open={openFeedbackModal}
        handleClose={() => setOpenFeedbackModal(false)}
        handleFeedbackSubmit={handleFeedbackSubmit}
      />
    </Box>
  );
};

export default ChatScreen;

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import ThumbUp from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDown from '@mui/icons-material/ThumbDownOutlined';
import Star from '@mui/icons-material/Star';
import GPTIcon from "../assets/pictures/GPTBackgroundImage.png";
import questions from "../assets/data/questions.json";
import responses from "../assets/data/aiReponseData.json";
import Feedback from "./Feedback";
import yourImage from "../assets/pictures/ownImage.png";

const ChatScreen = ({ isNewChat, setIsNewChat, chatData, setChatData }) => {
  const [userInput, setUserInput] = useState("");
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ratingIndex, setRatingIndex] = useState(null);
  const [feedbackIndex, setFeedbackIndex] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);


  const findDateAndTimeInAMPM = (date) => {
    const formattedDate = new Date(date);
    let hours = formattedDate.getHours();
    const minutes = formattedDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + strMinutes + " " + ampm;
  };

  const handleSubmit = () => {
    const trimmedInput = userInput.trim();
    if (trimmedInput.length > 0) {
      const matchedReponse = responses.find(
        (item) => item.question.toLowerCase() === userInput.toLowerCase()
      );
      const response = matchedReponse
        ? matchedReponse.response
        : "Sorry, I don't have an answer for that.";
      const newEntry = {
        question: userInput,
        response,
        date: new Date().toLocaleString(),
        rating: null,
        feedback: "",
      };
      setChatData([...chatData, newEntry]);
      setUserInput("");
      setIsNewChat(false);
    } else {
      console.log("error");
    }
  };

  const handleSave = () => {
    const savedData = JSON.parse(localStorage.getItem("chatData")) || [];
    if (chatData.length > 0) {
      const newData = [...savedData, ...chatData];
      localStorage.setItem("chatData", JSON.stringify(newData));
      setIsNewChat(true);
      setChatData([]);
    }
  };

  const handleFeedbackSubmit = (feedback) => {
    if (feedbackIndex !== null) {
      const updatedChatData = [...chatData];
      updatedChatData[feedbackIndex].feedback = feedback;
      setChatData(updatedChatData);
      setFeedbackIndex(null);
    }
    setOpenFeedbackModal(false);
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setHoverRating(null);
  };

  const handleLikeClick = (index) => {
    setRatingIndex(index);
  };

  const handleDislikeClick = (index) => {
    setFeedbackIndex(index);
    setOpenFeedbackModal(true);
  };

  const handleRatingClick = (index, rating) => {
    const updatedChatData = [...chatData];
    updatedChatData[index].rating = rating;
    setChatData(updatedChatData);
    setRatingIndex(null);
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatData]);

  return (
    <Box
      sx={{
        p: 1.8,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)",
      }}
    >
      {!isNewChat ? (
        <Box
          ref={chatContainerRef}
          sx={{
            height: "87.7vh",
            overflow: "auto",
            alignContent: "flex-end",
            "::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          <Grid
            container
            sx={{ flex: "1 0 auto", display: "flex", alignItems: "flex-end" }}
          >
            {chatData.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    backgroundColor: "rgba(215, 199, 244, 0.13)",
                    boxShadow: "0px 0px 7px 0px rgba(0, 0, 0, 0.5)",
                    borderRadius: "150px",
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 30px ",
                    ml: 1,
                    mr: 1,
                  }}
                >
                  <img
                    src={yourImage}
                    alt="Not Available"
                    width="40px"
                    height="40px"
                    style={{ borderRadius: "50%" }}
                  />
                  <Box sx={{ ml: 1.5 }} display="flex" flexDirection="column">
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "18px", fontWeight: "bold" }}
                    >
                      You
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#555555",
                      }}
                    >
                      {item.question}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: 1,
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#555555",
                      }}
                    >
                      {findDateAndTimeInAMPM(item.date)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  sx={{
                    backgroundColor: "rgba(215, 199, 244, 0.13)",
                    boxShadow: "0px 0px 7px 0px rgba(0, 0, 0, 0.5)",
                    borderRadius: "150px",
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 30px ",
                    ml: 1,
                    mr: 1,
                  }}
                >
                  <img
                    src={GPTIcon}
                    alt="Not Available"
                    width="40px"
                    height="40px"
                    style={{ borderRadius: "50%" }}
                  />
                  <Box sx={{ ml: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "18px", fontWeight: "bold" }}
                    >
                      Bot AI
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#555555",
                      }}
                    >
                      {item.response}
                    </Typography>
                    <Box display="flex" alignItems="center" >
                      <Typography
                        variant="h6"
                        sx={{
                          mt: 1,
                          fontSize: "13px",
                          fontWeight: "400",
                          color: "#555555",
                          mr:2,
                        }}
                      >
                        {findDateAndTimeInAMPM(item.date)}
                      </Typography>
                      {hoveredIndex === index && ratingIndex !== index && (
                        <Box>
                          <IconButton onClick={() => handleLikeClick(index)}>
                            <ThumbUp fontSize="small"/>
                          </IconButton>
                          <IconButton onClick={() => handleDislikeClick(index)}>
                            <ThumbDown fontSize="small"/>
                          </IconButton>
                        </Box>
                      )}
                      {ratingIndex === index && (
                        <Box>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <IconButton
                              key={star}
                              onClick={() => handleRatingClick(index, star)}
                              onMouseEnter={() => handleStarHover(star)}
                              onMouseLeave={() => handleStarHover(null)}
                            >
                              <Star
                                style={{
                                  color:
                                    star <= (hoverRating || chatData[index].rating)
                                      ? "#FFD700"
                                      : "#000000",
                                }}
                              />
                            </IconButton>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
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
                boxShadow: "0px 0px 9px 0px #555555",
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
          ml: 0.5,
          mr: 0.5,
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your question here..."
          onChange={handleChange}
          value={userInput}
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

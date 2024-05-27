import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import yourImage from "../assets/pictures/ownImage.png";
import GPTIcon from "../assets/pictures/GPTBackgroundImage.png";

const PastConversation = ({ savedData }) => {
  const [filterRating, setFilterRating] = useState("");

  const handleFilterChange = (event) => {
    setFilterRating(event.target.value);
  };

  const filteredData = filterRating
    ? savedData.filter((item) => item.rating === parseInt(filterRating))
    : savedData;

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
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: "20px" }}>
          Conversation History
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <FormControl sx={{ width: "30%", mb: 2 }}>
          <InputLabel>Rating Filter</InputLabel>
          <Select value={filterRating} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value={1}>1 Star</MenuItem>
            <MenuItem value={2}>2 Stars</MenuItem>
            <MenuItem value={3}>3 Stars</MenuItem>
            <MenuItem value={4}>4 Stars</MenuItem>
            <MenuItem value={5}>5 Stars</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          height: "83vh",
          overflow: "auto",
          alignContent: "flex-end",
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        <Grid container spacing={2}>
          {filteredData.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  background:
                    "linear-gradient(90deg, #BFACE2 0%, #D7C7F4 100%)",
                  borderRadius: "15px",
                  mb: 1,
                  p: 1.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 1.5,
                  }}
                >
                  <img
                    src={yourImage}
                    alt="Not Available"
                    width="50px"
                    height="50px"
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
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 1.5,
                  }}
                >
                  <img
                    src={GPTIcon}
                    alt="Not Available"
                    width="50px"
                    height="50px"
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
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
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
                      <Box sx={{ml:3}}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <= item.rating ? (
                              <Star
                                style={{ color: "#000000" }}
                                sx={{ fontSize: "medium" }}
                              />
                            ) : (
                              <StarBorder
                                style={{ color: "#000000" }}
                                sx={{ fontSize: "medium" }}
                              />
                            )}
                          </span>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 1.5,
                  }}
                >
                  <Box sx={{ ml: 7.3, display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "15px",
                        fontWeight: "700",
                      }}
                    >
                      Feedback:
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "15px", ml: 1 }}>
                      {item.feedback || "No Feedback"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PastConversation;

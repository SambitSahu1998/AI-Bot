import React, { useState } from "react";
import { Box, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const PastConversation = ({ savedData }) => {
  const [filterRating, setFilterRating] = useState('');

  const handleFilterChange = (event) => {
    setFilterRating(event.target.value);
  };

  const filteredData = filterRating
    ? savedData.filter(item => item.rating === parseInt(filterRating))
    : savedData;

  return (
    <Box
      sx={{
        p: 1.8,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)",
      }}
    >
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Filter by Rating</InputLabel>
        <Select value={filterRating} onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value={1}>1 Star</MenuItem>
          <MenuItem value={2}>2 Stars</MenuItem>
          <MenuItem value={3}>3 Stars</MenuItem>
          <MenuItem value={4}>4 Stars</MenuItem>
          <MenuItem value={5}>5 Stars</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {filteredData.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Box sx={{ backgroundColor: "#D7C7F4", borderRadius: '5px', mb: 1.5, p: 1.5 }}>
              <Typography variant="h6">Question: {item.question}</Typography>
              <Typography variant="h6">Response: {item.response}</Typography>
              <Typography variant="h6">Date: {item.date}</Typography>
              <Typography variant="h6">Rating: {item.rating || 'No Rating'}</Typography>
              <Typography variant="h6">Feedback: {item.feedback || 'No Feedback'}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PastConversation;

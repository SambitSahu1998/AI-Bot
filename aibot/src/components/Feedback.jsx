import React, { useState } from "react";
import { Box, Typography, Modal, TextField, Button } from "@mui/material";
import ideaImage from "../assets/pictures/ideaBulb.png";
import CloseIcon from "@mui/icons-material/Close";

const Feedback = ({ open, handleClose, handleFeedbackSubmit }) => {

  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    handleFeedbackSubmit(feedback);
    setFeedback("");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          backgroundColor: "#FAF7FF",
          border: "1px solid #999999",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px #333333",
          p: 2,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <CloseIcon sx={{cursor:'pointer'}} onClick={handleClose}/>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <img src={ideaImage} alt="Not Available" width="30px" height="30px" />
          <Typography
            variant="h5"
            component="h2"
            sx={{ ml: 1, fontWeight: "500" }}
          >
            Provide Additional Feedback
          </Typography>
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Type your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Button
            onClick={handleSubmit}
            sx={{
              mt: 2,
              backgroundColor: "#D7C7F4",
              color: "#000000",
              fontWeight: "500",
            }}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Feedback;

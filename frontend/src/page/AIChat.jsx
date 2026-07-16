import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { sendMessage } from "../services/chatService";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    try {
      const res = await sendMessage(message);
      setResponse(res.data.summary);
    } catch (error) {
      console.error(error);
      alert("AI request failed");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          AI CRM Assistant
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={8}
          label="Describe your meeting"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSend}
        >
          Send to AI
        </Button>

        <TextField
          fullWidth
          multiline
          rows={8}
          label="AI Response"
          value={response}
          sx={{ mt: 3 }}
          InputProps={{
            readOnly: true,
          }}
        />
      </Paper>
    </Container>
  );
}
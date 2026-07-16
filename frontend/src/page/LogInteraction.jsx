import { useState } from "react";
import { generateSummary } from "../services/aiService";
import { createInteraction } from "../services/interactionService";

import {
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function LogInteraction() {
  const [tab, setTab] = useState(0);

  const [loading, setLoading] = useState(false);

  const [chatNotes, setChatNotes] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [interaction, setInteraction] = useState({
    doctor_name: "",
    meeting_date: "",
    notes: "",
    ai_summary: "",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleGenerateSummary = async () => {
    if (!interaction.doctor_name.trim()) {
      showSnackbar("Doctor Name is required.", "warning");
      return;
    }

    if (!interaction.notes.trim()) {
      showSnackbar("Meeting Notes are required.", "warning");
      return;
    }

    try {
      setLoading(true);

      const response = await generateSummary(interaction.notes);

      setInteraction((prev) => ({
        ...prev,
        ai_summary: response.data.summary,
      }));

      showSnackbar("AI Summary generated successfully.");
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to generate AI Summary.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChatSummary = async () => {
    if (!chatNotes.trim()) {
      showSnackbar("Please enter meeting details.", "warning");
      return;
    }

    try {
      setLoading(true);

      const response = await generateSummary(chatNotes);

      setInteraction((prev) => ({
        ...prev,
        notes: chatNotes,
        ai_summary: response.data.summary,
      }));

      showSnackbar("AI Response generated successfully.");
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to generate AI Response.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInteraction = async () => {
    if (!interaction.doctor_name.trim()) {
      showSnackbar("Doctor Name is required.", "warning");
      return;
    }

    if (!interaction.meeting_date) {
      showSnackbar("Meeting Date is required.", "warning");
      return;
    }

    if (!interaction.notes.trim()) {
      showSnackbar("Meeting Notes are required.", "warning");
      return;
    }

    if (!interaction.ai_summary.trim()) {
      showSnackbar(
        "Please generate AI Summary before saving.",
        "warning"
      );
      return;
    }

    try {
      await createInteraction(interaction);

      showSnackbar("Interaction saved successfully.");

      setInteraction({
        doctor_name: "",
        meeting_date: "",
        notes: "",
        ai_summary: "",
      });

      setChatNotes("");
      setTab(0);

    } catch (error) {
      console.error(error);
      showSnackbar("Failed to save interaction.", "error");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Log HCP Interaction
        </Typography>

        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          centered
        >
          <Tab label="Structured Form" />
          <Tab label="AI Chat" />
        </Tabs>

        {tab === 0 && (
          <Box mt={4}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Doctor Name"
                  value={interaction.doctor_name}
                  onChange={(e) =>
                    setInteraction({
                      ...interaction,
                      doctor_name: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Meeting Date"
                  type="date"
                  value={interaction.meeting_date}
                  onChange={(e) =>
                    setInteraction({
                      ...interaction,
                      meeting_date: e.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Meeting Notes"
                  value={interaction.notes}
                  onChange={(e) =>
                    setInteraction({
                      ...interaction,
                      notes: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={handleGenerateSummary}
                  sx={{ mr: 2 }}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        size={20}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                      Generating...
                    </>
                  ) : (
                    "🤖 Generate AI Summary"
                  )}
                </Button>

                <Button
                  variant="outlined"
                  disabled={
                    loading ||
                    !interaction.ai_summary.trim()
                  }
                  onClick={handleSaveInteraction}
                >
                  💾 Save Interaction
                </Button>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="AI Summary"
                  value={interaction.ai_summary}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

            </Grid>
          </Box>
        )}
                {/* AI Chat */}
        {tab === 1 && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              AI CRM Assistant
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={8}
              label="Describe your meeting"
              placeholder="Example: Met Dr. Rajesh today and discussed the new diabetes treatment..."
              value={chatNotes}
              onChange={(e) => setChatNotes(e.target.value)}
            />

            <Box mt={3}>
              <Button
                variant="contained"
                disabled={loading}
                onClick={handleChatSummary}
                sx={{ mr: 2 }}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size={20}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    Generating...
                  </>
                ) : (
                  "🤖 Send to AI"
                )}
              </Button>

              <Button
                variant="outlined"
                disabled={
                  loading ||
                  !interaction.ai_summary.trim()
                }
                onClick={handleSaveInteraction}
              >
                💾 Save Interaction
              </Button>
            </Box>

            <Box mt={3}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="AI Response"
                value={interaction.ai_summary}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </Box>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert
            severity={snackbar.severity}
            variant="filled"
            onClose={() =>
              setSnackbar((prev) => ({
                ...prev,
                open: false,
              }))
            }
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

      </Paper>
    </Container>
  );
}
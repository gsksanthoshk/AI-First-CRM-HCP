import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";

export default function InteractionTable({ interactions }) {
  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Interaction History
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Doctor</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Notes</b></TableCell>
              <TableCell><b>AI Summary</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {interactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No interactions found
                </TableCell>
              </TableRow>
            ) : (
              interactions.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell>{interaction.doctor_name}</TableCell>

                  <TableCell>{interaction.meeting_date}</TableCell>

                  <TableCell sx={{ maxWidth: 250, whiteSpace: "pre-wrap" }}>
                    {interaction.notes}
                  </TableCell>

                  <TableCell sx={{ maxWidth: 350, whiteSpace: "pre-wrap" }}>
                    {interaction.ai_summary}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
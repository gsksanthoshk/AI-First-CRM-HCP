import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

export default function History() {
  const interactions = [
    {
      doctor: "Dr. Sharma",
      hospital: "Apollo Hospital",
      product: "Ozempic",
      date: "09-07-2026",
    },
    {
      doctor: "Dr. Kumar",
      hospital: "Care Hospital",
      product: "Wegovy",
      date: "08-07-2026",
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Interaction History
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Doctor</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {interactions.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.doctor}</TableCell>
                <TableCell>{item.hospital}</TableCell>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Button variant="outlined">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
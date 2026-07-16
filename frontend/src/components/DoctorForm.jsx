import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function DoctorForm({
  open,
  handleClose,
  doctor,
  setDoctor,
  handleSave,
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {doctor.id ? "Edit Doctor" : "Add Doctor"}
      </DialogTitle>

      <DialogContent>

        <TextField
          margin="normal"
          label="Doctor Name"
          fullWidth
          value={doctor.name}
          onChange={(e) =>
            setDoctor({ ...doctor, name: e.target.value })
          }
        />

        <TextField
          margin="normal"
          label="Specialty"
          fullWidth
          value={doctor.specialty}
          onChange={(e) =>
            setDoctor({ ...doctor, specialty: e.target.value })
          }
        />

        <TextField
          margin="normal"
          label="Hospital"
          fullWidth
          value={doctor.hospital}
          onChange={(e) =>
            setDoctor({ ...doctor, hospital: e.target.value })
          }
        />

        <TextField
          margin="normal"
          label="Email"
          fullWidth
          value={doctor.email}
          onChange={(e) =>
            setDoctor({ ...doctor, email: e.target.value })
          }
        />

        <TextField
          margin="normal"
          label="Phone"
          fullWidth
          value={doctor.phone}
          onChange={(e) =>
            setDoctor({ ...doctor, phone: e.target.value })
          }
        />

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
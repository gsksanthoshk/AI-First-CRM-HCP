import { useState, useEffect } from "react";

import Layout from "../components/Layout";
import DoctorTable from "../components/DoctorTable";
import DoctorForm from "../components/DoctorForm";

import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/doctorService";

import {
  Button,
  Typography,
  TextField,
  Box,
} from "@mui/material";

function Doctors() {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [doctor, setDoctor] = useState({
    name: "",
    specialty: "",
    hospital: "",
    email: "",
    phone: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const response = await getDoctors();
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      if (editIndex !== null) {
        await updateDoctor(doctors[editIndex].id, doctor);
      } else {
        await createDoctor(doctor);
      }

      await loadDoctors();

      setDoctor({
        name: "",
        specialty: "",
        hospital: "",
        email: "",
        phone: "",
      });

      setEditIndex(null);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (index) => {
    try {
      await deleteDoctor(doctors[index].id);
      await loadDoctors();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (index) => {
    setDoctor(doctors[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
    doctor.hospital.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Healthcare Professionals
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <TextField
          label="Search Doctor"
          placeholder="Name, Specialty or Hospital"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "40%" }}
        />

        <Button
          variant="contained"
          onClick={() => {
            setDoctor({
              name: "",
              specialty: "",
              hospital: "",
              email: "",
              phone: "",
            });

            setEditIndex(null);
            setOpen(true);
          }}
        >
          Add Doctor
        </Button>
      </Box>

      <DoctorTable
        doctors={filteredDoctors}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <DoctorForm
        open={open}
        handleClose={() => setOpen(false)}
        doctor={doctor}
        setDoctor={setDoctor}
        handleSave={handleSave}
      />
    </Layout>
  );
}

export default Doctors;
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getDoctors = () => API.get("/doctors/");

export const createDoctor = (doctor) => API.post("/doctors/", doctor);

export const updateDoctor = (id, doctor) =>
  API.put(`/doctors/${id}`, doctor);

export const deleteDoctor = (id) =>
  API.delete(`/doctors/${id}`);
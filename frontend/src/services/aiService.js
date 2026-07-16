import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-first-crm-hcp-8x4b.onrender.com",
});

export const generateSummary = async (notes) => {
  return API.post("/ai/summary", {
    notes,
  });
};
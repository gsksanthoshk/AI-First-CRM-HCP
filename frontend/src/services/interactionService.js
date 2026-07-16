import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getInteractions = () =>
  API.get("/interactions/");

export const createInteraction = (interaction) =>
  API.post("/interactions/", interaction);
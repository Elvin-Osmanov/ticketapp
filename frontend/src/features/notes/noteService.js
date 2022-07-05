import axios from "axios";

const API_URL = "/api/tickets/";

const getNotes = async (tikcetId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(API_URL + tikcetId + "/notes", config);

  return response.data;
};

const createNote = async (noteText, tikcetId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(
    API_URL + tikcetId + "/notes",
    { text: noteText },
    config
  );

  return response.data;
};

export const noteService = {
  getNotes,
  createNote,
};

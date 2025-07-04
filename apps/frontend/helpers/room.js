import axios from "axios";
export const createRoom = async (username, userId, email) => {
  const baseurl = import.meta.env.VITE_BACKEND_BASE_URL;
  try {
    const payload = { username, userId, email };
    const response = await axios.post(`${baseurl}/createroom`, payload);
    return response;
  } catch (err) {
    console.log(err);
  }
};

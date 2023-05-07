import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;
const authUrl = process.env.VUE_APP_AUTH_URL;

export default {
  login(email, password) {
    return axios.post(authUrl + "/login", { email, password });
  },
  register(name, email, password) {
    return axios.post(authUrl + "/register", { name, email, password });
  },
  logout() {
    return axios.delete(authUrl + "/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hangman_token")}`,
      },
    });
  },
  getUser() {
    return axios.get(authUrl + "/user");
  },
  saveScore(word) {
    return axios.post(
      `${apiUrl}/games`,
      {
        word,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hangman_token")}`,
        },
      }
    );
  },
  updateScore(gameId, gameTime, word) {
    return axios.put(
      `${apiUrl}/games/${gameId}`,
      {
        game_time: gameTime,
        word,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hangman_token")}`,
        },
      }
    );
  },
  getMyRecords(userId) {
    return axios.get(`${apiUrl}/users/${userId}/games`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hangman_token")}`,
      },
    });
  },
  getPlayers() {
    return axios.get(apiUrl + "/games", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hangman_token")}`,
      },
    });
  },
};

import router from "@/router/index";

export default {
  redirectToMainPage() {
    if (this.isLoggedIn()) {
      router.push("/");
    }
  },
  logout() {
    localStorage.removeItem("hangman_token");
    localStorage.removeItem("hangman_user");

    router.push("/login");
  },
  isLoggedIn() {
    const authToken = localStorage.getItem("hangman_token");
    if (!authToken) {
      return false;
    }

    return true;
  },
  getUser() {
    return JSON.parse(localStorage.getItem("hangman_user"));
  },
};

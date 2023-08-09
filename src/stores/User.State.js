import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    logOut() {
      this.isLoggedIn = false;
    },
  },
});

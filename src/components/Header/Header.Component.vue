<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-show="!userStore.isLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <li>
            <router-link
              class="px-2 text-white"
              :to="{ name: 'manage' }"
              v-show="userStore.isLoggedIn"
              >Manage</router-link
            >
          </li>
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }"
              >About</router-link
            >
          </li>
          <li v-show="userStore.isLoggedIn">
            <a class="px-2 text-white" @click.prevent="logOut" href="#"
              >Log out</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import useModalStore from "../../stores/Modal.State";
import useUserStore from "../../stores/User.State";

export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore),
    ...mapStores(useUserStore),
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
    logOut() {
      this.userStore.logOut();
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

:to="{ name: 'home' }"

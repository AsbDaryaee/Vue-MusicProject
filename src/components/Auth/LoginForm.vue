<template>
  <div>
    <vee-form :validationSchema="schema" @submit="login">
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field
          name="email"
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
        />
        <ErrorMessage class="text-red-600" name="email" />
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field
          type="password"
          name="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
        />
        <ErrorMessage class="text-red-600" name="password" />
      </div>
      <button
        @click.prevent="login"
        type="submit"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      >
        Submit
      </button>
    </vee-form>
  </div>
</template>
<script>
import { mapStores } from "pinia";
import useUserStore from "../../stores/User.State";
import useModalStore from "../../stores/Modal.State";

export default {
  name: "LoginForm",
  data() {
    return {
      schema: {
        email: "required|min:3|max:100|email",
        password: "required|min:9|max:100|notOneOf:password",
      },
    };
  },
  computed: {
    ...mapStores(useUserStore, "isLoggedIn"),
    ...mapStores(useModalStore, "isOpen"),
  },
  methods: {
    login() {
      this.userStore.isLoggedIn = true;
      setTimeout(() => {
        this.modalStore.isOpen = false;
      }, 1000);
    },
  },
};
</script>

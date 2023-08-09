<template>
  <AppHeader />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <AppPlayer />

  <AppAuth />
</template>

<script>
import AppHeader from "@/components/Header/Header.Component.vue";
import AppAuth from "@/components/Auth/Auth.Component.vue";
import AppPlayer from "@/components/Player/Player.Component.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppAuth,
    AppPlayer,
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.2s linear;
}

.fade-leave-to {
  transition: all 0.2s linear;
  opacity: 0;
}
</style>

<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          @click.prevent="newSong(song)"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.title }}</div>
          <div>{{ song.artists?.[0]?.fullName }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments: {{ comments.length }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <form>
            <textarea
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></textarea>
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
            >
              Submit
            </button>
          </form>
          <!-- Sort Comments -->
          <select
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="c in comments"
        :key="c.id"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ c.fullName }}</div>
          <time>5 mins ago</time>
        </div>

        <p>
          {{ c.text }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "pinia";

import usePlayerStore from "../stores/Player.State";

export default {
  name: "song",
  data() {
    return {
      id: this.$route.params.id,
      song: { title: String, artists: Array },
      comments: {},
    };
  },
  async created() {
    const commentUrl = `https://api.tekye.net/api/comment/Content/${this.id}`;
    const url = `https://api.tekye.net/api/ExternalContent/Song/${this.id}`;

    await axios.get(url).then((res) => {
      this.song = res.data;
    });
    const resComments = await axios.get(commentUrl);
    this.comments = resComments.data;
  },
  methods: {
    ...mapActions(usePlayerStore, ["newSong"]),
  },
};
</script>

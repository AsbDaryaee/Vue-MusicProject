<template>
  <main>
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
            suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
            pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <i
            class="fa fa-headphones-alt float-right text-green-400 text-xl"
          ></i>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <SongItem v-for="song in songs" :key="song.id" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import SongItem from "../components/SongItem/SongItem.Component.vue";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      pageNum: 1,
      songs: [],
      penddingRequest: false,
    };
  },
  components: {
    SongItem,
  },
  methods: {
    async getSongs() {
      if (this.penddingRequest) {
        return;
      }

      this.penddingRequest = true;

      const url = `https://api.tekye.net/api/ExternalContent/GetSelectedSong/${this.pageNum}/5`;

      try {
        const res = await axios.get(url);
        const data = res.data.items;
        data.forEach((element) => {
          this.songs.push(element);
        });
        this.penddingRequest = false;
      } catch (error) {
        console.log(error);
        this.penddingRequest = false;
      }
    },
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindows =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindows) {
        this.pageNum++;
        this.getSongs();
      }
    },
  },
  async created() {
    this.getSongs();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

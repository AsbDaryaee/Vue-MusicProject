<template lang="">
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AppUpload ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItems
              v-for="(song, i) in songs"
              :key="song.id"
              :song="song"
              :updateSong="updateSong"
              :removeSong="removeSong"
              :updateFlag="updateUnsavedFlag"
              :index="i"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppUpload from "../components/Upload/Upload.Component.vue";
import CompositionItems from "../components/CompositionItems/CompositionItems.Component.vue";

import axios from "axios";

export default {
  name: "ManageView",
  data() {
    return {
      songs: [],
      unsavedFlag: false,
      url: "https://api.tekye.net/api/ExternalContent/GetSelectedSong/1/10",
    };
  },
  components: {
    AppUpload,
    CompositionItems,
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.upload.cancelUploads();
    next();
  },
  async created() {
    try {
      const res = await axios.get(this.url);
      const data = res.data.items;
      data.forEach((element) => {
        this.songs.push(element);
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    updateSong(index, values) {
      this.songs[index].title = values.title;
    },
    removeSong(index) {
      this.songs.splice(index, 1);
    },
    addSong(title) {
      this.songs.push({ title });
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      const leave = confirm("Are You Want To Leave?");
      next(leave);
    }
  },
};
</script>

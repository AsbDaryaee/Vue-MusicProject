<template lang="">
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.id } }"
        class="font-bold block text-gray-600"
        >{{ song.title }}</router-link
      >
      <span class="text-gray-500 text-sm">{{ song.artists[0].fullName }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <span class="comments">
        <i class="fa fa-comments text-gray-600"></i>
        15
      </span>
    </div>
  </li>
</template>
<script>
export default {
  name: "SongItem",
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
};
</script>

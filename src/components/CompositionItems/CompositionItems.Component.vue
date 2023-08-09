<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.title }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="openEdit"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4 mb-4"
        v-if="showAlert"
        :class="alertVariant"
      >
        {{ alertMessage }}
      </div>
      <vee-form
        :validation-schema="schema"
        :initial-values="initialValues"
        @submit="editSong"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="title"
            @input="updateFlag(true)"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <ErrorMessage name="title" class="text-red-600" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            @input="updateFlag(true)"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <ErrorMessage name="genre" class="text-red-600" />
        </div>
        <button
          :disabled="inSubmission"
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
        >
          Submit
        </button>
        <button
          :disabled="inSubmission"
          type="button"
          @click.prevent="closeEdit"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompositionItem",
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateFlag: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        title: "required|min:3|max:100",
        genre: "min:3|max:100|alphaSpaces",
      },
      initialValues: {
        title: this.song.title,
        genre: "Hip Top",
      },
      inSubmission: false,
      showAlert: false,
      alertVariant: "bg-green-500",
      alertMessage: "Song Editted Successfully",
    };
  },
  methods: {
    editSong(values) {
      this.inSubmission = true;
      this.showAlert = true;

      this.updateSong(this.index, values);

      setTimeout(() => {
        this.inSubmission = false;
        this.showAlert = false;
        this.updateUnsavedFlag(false);
      }, 3000);
    },
    openEdit() {
      this.showForm = true;
    },
    closeEdit() {
      this.showForm = false;
    },
    deleteSong() {
      this.removeSong(this.index);
    },
  },
};
</script>

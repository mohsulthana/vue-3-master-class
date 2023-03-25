<script setup>
import { reactive, computed } from 'vue'

const emits = defineEmits('save', 'cancel')
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})

const form = reactive({
  title: props.title,
  text: props.text
})

const existing = computed(() => {
  return !!props.title
})

function save() {
  emits('save', { ...form })
}
</script>

<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input type="text" id="thread_title" class="form-input" name="title" v-model="form.title" />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="form.text"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost" @click="emits('cancel')">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ existing ? 'Update' : 'Publish' }}
      </button>
    </div>
  </form>
</template>
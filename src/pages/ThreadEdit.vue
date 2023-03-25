<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '../store/PostsStore'
import { useThreadsStore } from '../store/ThreadsStore'
import ThreadEditor from '../components/ThreadEditor.vue'

const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const thread = computed(() => {
  const threadStore = useThreadsStore()
  return threadStore.threads.find((thread) => thread.id === props.id)
})

const text = computed(() => {
  const postStore = usePostsStore()
  return postStore.posts.find((post) => post.id === thread.value.posts[0]).text
})

const save = async ({ title, text }) => {
  const threadStore = useThreadsStore()
  const thread = await threadStore.updateThread({
    text,
    title,
    id: props.id
  })
  router.push({ name: 'ThreadShow', params: { id: thread.id } })
}

function cancel() {
  router.push({ name: 'ThreadShow', params: { id: props.id } })
}
</script>

<template>
  <div class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>
    <ThreadEditor :title="thread.title" :text="text" @save="save" @cancel="cancel" />
  </div>
</template>
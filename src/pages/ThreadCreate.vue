<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForumStore } from '../store/ForumStore'
import { useThreadsStore } from '../store/ThreadsStore'
import ThreadEditor from '../components/ThreadEditor.vue'

const router = useRouter()
const props = defineProps({
  forumId: {
    type: String,
    required: true
  }
})

const forum = computed(() => {
  const forumStore = useForumStore()
  return forumStore.forums.find((forum) => forum.id === props.forumId)
})

const save = async ({ title, text }) => {
  const threadStore = useThreadsStore()
  const thread = await threadStore.createThread({
    text,
    title,
    forumId: props.forumId
  })
  router.push({ name: 'ThreadShow', params: { id: thread.id } })
}

const cancel = () => {
  router.push({ name: 'Forum', params: forum.value.id })
}
</script>

<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>
    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>
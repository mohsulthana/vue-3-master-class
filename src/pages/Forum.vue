<script setup>
import ThreadList from '@/components/ThreadList.vue'
import sourceData from '@/data.json'
import { computed } from 'vue'
import { useThreadsStore } from '../store/ThreadsStore'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const forum = computed(() => {
  return sourceData.forums.find((forum) => forum.id === props.id)
})
const threads = computed(() => {
  const threadStore = useThreadsStore()
  return forum.value.threads.map((threadId) => threadStore.thread(threadId))
})
</script>

<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <div class="text-lead">{{ forum.description }}</div>
      </div>
      <router-link
        :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
        class="btn-green btn-small"
      >
        Start a thread
      </router-link>
    </div>
  </div>
  <div class="col-full push-top">
    <ThreadList :threads="threads" />
  </div>
</template>
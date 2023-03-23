<script setup>
import { computed } from 'vue'
import { useThreadsStore } from '../store/ThreadsStore';
import { usePostsStore } from '../store/PostsStore';
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue';

const threadStore = useThreadsStore()
const postStore = usePostsStore()

// props
const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

// threads
const thread = computed(() => {
  return threadStore.threads.find(thread => thread.id === props.id)
})

// post
const threadPosts = computed(() => {
  return postStore.posts.filter((post) => post.threadId === props.id)
})
const addPost = (eventData) => {
  const post = {
    ...eventData.post,
    threadId: props.id
  }
  postStore.createPost(post)
}
</script>

<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list :posts="threadPosts" />
    <post-editor @save="addPost"/>
  </div>
</template>

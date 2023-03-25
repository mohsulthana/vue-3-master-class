<script setup>
import { computed } from 'vue'
import { useUserStore } from '../store/UserStore'

const props = defineProps({
  posts: {
    required: true,
    type: Array
  }
})

const userStore = useUserStore()

const users = computed(() => {
  return userStore.users
})

const userById = (userId) => {
  return userStore.user(userId)
}
</script>

<template>
  <div class="post-list">
    <div class="post" v-for="post in props.posts" :key="post.id">
      <div class="user-info">
        <a href="profile.html#profile-details" class="user-name">
          {{ userById(post.userId).name }}
        </a>

        <a href="profile.html#profile-details">
          <img class="avatar-large" :src="userById(post.userId).avatar" alt="" />
        </a>

        <p class="desktop-only text-small">{{ userById(post.userId).postsCount }} posts</p>
        <p class="desktop-only text-small">{{ userById(post.userId).threadsCount }} threads</p>
      </div>

      <div class="post-content">
        <div>
          <p>
            {{ post.text }}
          </p>
        </div>
        <a href="#" style="margin-left: auto" class="link-unstyled" title="Make a change">
          <i class="fa fa-pencil"></i>
        </a>
      </div>

      <div class="post-date text-faded">
        <app-date :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

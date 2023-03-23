<script setup>
import { reactive } from 'vue'
import sourceData from '@/data.json'

const props = defineProps({
  posts: {
    required: true,
    type: Array
  }
})

const users = reactive(sourceData.users)
const userById = (userId) => users.find((u) => u.id === userId)
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

        <p class="desktop-only text-small">{{ posts.length }} posts</p>
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

<script setup>
import { reactive } from 'vue'
import sourceData from '@/data.json'

const props = defineProps({
  threads: {
    required: true,
    type: Array
  }
})

const users = reactive(sourceData.users)

const userById = (userId) => users.find((u) => u.id === userId)
</script>

<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in props.threads" :key="thread.id" class="thread">
        <div>
          <p>
            <router-link :to="{ name: 'ThreadShow', params: { id: thread.id } }">
              {{ thread.title }}
            </router-link>
          </p>
          <p class="text-faded text-xsmall">
            By {{ userById(thread.userId).name }}, {{ thread.publishedAt }}
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">{{ thread.posts?.length || 0 }} replies</p>
          <img class="avatar-medium" :src="userById(thread.userId).avatar" alt="" />
          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId).name }}</a>
            </p>
            <p class="text-xsmall text-faded">{{ thread.publishedAt }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

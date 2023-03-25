<script setup>
import { reactive } from 'vue'
import sourceData from '@/data.json'
import { useThreadsStore } from '../store/ThreadsStore'

const props = defineProps({
  threads: {
    required: true,
    type: Array
  }
})
const thread = useThreadsStore().thread(props.threads[0].id)

const users = reactive(sourceData.users)

const userById = (userId) => users.find((u) => u.id === userId)
</script>

<template>
  <div class="col-full">
    <div class="thread-list">
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
          <p class="replies-count">{{ thread.repliesCount || 0 }} replies</p>
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

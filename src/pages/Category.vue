<script setup>
import sourceData from '@/data.json'
import ForumList from '@/components/ForumList.vue'
import { computed } from 'vue'

const props = defineProps({
    id: {
        required: true,
        type: String
    }
})

const category = computed(() => {
    return sourceData.categories.find(category => category.id === props.id)
})
const getForumsForCategory = (category) => {
    return sourceData.forums.filter(forum => forum.categoryId === category.id)
}
</script>

<template>
  <div class="col-full">
      <div class="forum-list">
        <h1>{{ category.name }}</h1>
        <ForumList :title="category.name" :forums="getForumsForCategory(category)" />
      </div>
  </div>
</template>

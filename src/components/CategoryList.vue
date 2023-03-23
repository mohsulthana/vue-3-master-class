<script setup>
import sourceData from '@/data.json'
import ForumList from '@/components/ForumList.vue'
const props = defineProps({
    categories: {
        required: true,
        type: Array
    }
})

const getForumsForCategory = (category) => {
    return sourceData.forums.filter(forum => forum.categoryId === category.id)
}
</script>

<template>
    <ForumList v-for="category in props.categories" :key="category.id" :forums="getForumsForCategory(category)" :category-name="category.name" :category-id="category.id"/>
</template>
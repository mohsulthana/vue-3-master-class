<script setup>
defineProps({
    forums: {
        required: true,
        type: Array
    },
    categoryName: {
        type: String,
        default: 'Forums'
    },
    categoryId: {
        required: false,
        type: String
    }
})

const forumThreadsWord = (forum) => {
    return forum.threads?.length ? forum.threads?.length > 1 ? 'threads' : 'thread': 'no threads'
}
</script>

<template>
    <div class="col-full">
        <div class="forum-list">
            <div class="list-title">
                <router-link v-if="categoryId" :to="{ name: 'Category', params: { id: categoryId }}">{{ categoryName }}</router-link>
                <span v-else>{{ categoryName }}</span>
            </div>
            <div class="forum-listing" v-for="forum in forums" :key="forum.id">
                <div class="forum-detai ls">
                    <router-link :to="{ name: 'Forum', params: { id: forum.id }}" class="text-xlarge">{{  forum.name }}</router-link>
                    <p>{{ forum.description }}</p>
                </div>
                <div class="threads-count">
                    <p>
                        <span class="count">{{ forum.threads?.length }}</span>
                        {{ forumThreadsWord(forum) }}
                    </p>
                </div>
                <div class="last-thread">
                </div>
            </div>
        </div>
    </div>
</template>
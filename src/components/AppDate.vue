<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedDate)

const props = defineProps({
    timestamp: {
        required: true,
        type: Number,
        default: new Date
    }
})

const diffForHumans = computed(() => {
    return dayjs.unix(props.timestamp).fromNow()
})

const humanFriendlyDate = computed(() => {
    return dayjs.unix(props.timestamp).format('llll')
})
</script>

<template>
  <span :title="humanFriendlyDate">
    {{ diffForHumans }}
  </span>
</template>

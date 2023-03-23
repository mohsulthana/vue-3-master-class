import { defineStore } from "pinia";
import sourceData from "@/data.json"

export const useForumStore = defineStore("ForumStore", {
    state: () => {
        return {
            ...sourceData
        }
    },
    actions: {}
})
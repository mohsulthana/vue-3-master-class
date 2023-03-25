import { defineStore } from "pinia";
import sourceData from '@/data.json'

export const useContributorsStore = defineStore("ContributorsStore", {
    state: () => {
        return {
            contributors: sourceData.contributors
        }
    },
    getters: {},
    actions: {}
})
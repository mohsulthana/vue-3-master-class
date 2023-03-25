import { defineStore } from "pinia";
import sourceData from '@/data.json'
import { findById } from "@/helpers";

export const useUserStore = defineStore("UserStore", {
    state: () => {
        return {
            ...sourceData,
            authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
        }
    },
    getters: {
        authUser: state => {
            return state.user(state.authId)
        },
        user: state => {
            return (id) => {
                const user = findById(state.users, id)
                if (!user) return null
                return {
                    ...user,
                    get posts() {
                        return state.posts.filter(post => post.userId === user.id)
                    },
                    get postsCount() {
                        return this.posts.length
                    },
                    get threads() {
                        return state.threads.filter(thread => thread.userId === user.id)
                    },
                    get threadsCount() {
                        return this.threads.length
                    }
                }
            }
        }
    },
    actions: {
        updateUser(user) {
            const userIndex = this.users.findIndex(userToFind => userToFind.id === user.id)
            this.users[userIndex] = user
        }
    }
})
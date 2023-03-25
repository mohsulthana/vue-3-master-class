import { defineStore } from "pinia";
import sourceData from "@/data.json"
import { useThreadsStore } from "./ThreadsStore";
import { useUserStore } from "./UserStore";
import { findById } from "../helpers";

export const usePostsStore = defineStore("PostsStore", {
    state: () => {
        return {
            posts: sourceData.posts
        }
    },
    actions: {
        createPost (post) {
            const user = useUserStore()
            post.id = 'ggqq' + Math.random()
            post.userId = user.authId
            post.publishedAt = Math.floor(Date.now()/1000)

            this.posts.push(post)

            useThreadsStore().threads.find(thread => thread.id === post.threadId)
            makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors'})
        }
    }
})

function makeAppendChildToParentMutation ({ parent, child}) {
    return (state, { childId, parentId }) => {
        const resource = findById(state[parent], parentId)
        resource[child] = resource[child] || []
        if (!resource[child].includes(childId)) {
            resource[child].push(childId)
        }
    }
}
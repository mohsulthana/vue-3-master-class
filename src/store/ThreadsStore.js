import { defineStore } from 'pinia'
import sourceData from '@/data.json'
import { usePostsStore } from './PostsStore'
import { useForumStore } from './ForumStore'
import { useUserStore } from './UserStore'

export const useThreadsStore = defineStore('ThreadsStore', {
  state: () => {
    return {
      threads: sourceData.threads
    }
  },
  getters: {},
  actions: {
    async createThread({ text, title, forumId }) {
      const postStore = usePostsStore()
      const forumStore = useForumStore()
      const userStore = useUserStore()

      const id = 'ggqq' + Math.random()
      const userId = userStore.authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = { id, forumId, title, publishedAt, userId }
      this.threads.push(thread)

      postStore.createPost({ text, threadId: id })

      // appendThreadToForum
      const forum = forumStore.forums.find((forum) => forum.id === forumId)
      forum.threads = forum.threads || []
      forum.threads.push(id)

      // appendThreadToUser
      const user = userStore.users.find((user) => user.id === userId)
      user.threads = user.threads || []
      user.threads.push(id)

      return this.threads.find((thread) => thread.id === id)
    },
    async updateThread({ title, text, id }) {
      const postStore = usePostsStore()

      const thread = this.threads.find((thread) => thread.id === id)
      const post = postStore.posts.find((post) => post.id === thread.posts[0])
      const newThread = { ...thread, title }
      const newPost = { ...post, text }

      const postIndex = postStore.posts.findIndex(p => p.id === newPost.id)
      if (newPost.id && postIndex !== -1) {
        postStore.posts[postIndex] = newPost
      } else {
        postStore.push(newPost)
      }

      const threadIndex = this.threads.findIndex(t => t.id === newThread.id)
      if (newThread.id && threadIndex !== -1) {
        this.threads[threadIndex] = newThread
      } else {
        this.threads.push(newThread)
      }
      return newThread
    }
  }
})

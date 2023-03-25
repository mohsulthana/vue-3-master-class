import { defineStore } from 'pinia'
import sourceData from '@/data.json'
import { usePostsStore } from './PostsStore'
import { useForumStore } from './ForumStore'
import { useUserStore } from './UserStore'
import { findById } from '../helpers'

export const useThreadsStore = defineStore('ThreadsStore', {
  state: () => {
    return {
      threads: sourceData.threads
    }
  },
  getters: {
    thread: (state) => {
      return (id) => {
        const thread = findById(state.threads, id)
        return {
          ...thread,
          get author() {
            const userStore = useUserStore()
            return findById(userStore.users, thread.userId)
          },
          get repliesCount() {
            return thread.posts.length - 1
          },
          get contributorsCount() {
            return thread.contributors.length
          }
        }
      }
    }
  },
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
      const forum = findById(forumStore.forums, forumId)
      forum.threads = forum.threads || []
      forum.threads.push(id)

      // appendThreadToUser
      const user = findById(userStore.users, userId)
      user.threads = user.threads || []
      user.threads.push(id)

      return findById(this.threads, id)
    },
    async updateThread({ title, text, id }) {
      const postStore = usePostsStore()

      const thread = findById(this.threads, id)
      const post = findById(postStore.posts, thread.posts[0]).find(
        (post) => post.id === thread.posts[0]
      )
      const newThread = { ...thread, title }
      const newPost = { ...post, text }

      const postIndex = postStore.posts.findIndex((p) => p.id === newPost.id)
      if (newPost.id && postIndex !== -1) {
        postStore.posts[postIndex] = newPost
      } else {
        postStore.push(newPost)
      }

      const threadIndex = this.threads.findIndex((t) => t.id === newThread.id)
      if (newThread.id && threadIndex !== -1) {
        this.threads[threadIndex] = newThread
      } else {
        this.threads.push(newThread)
      }
      return newThread
    }
  }
})

import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BlogService {
  async getBlogs() {
    const res = await api.get('api/blogs')
    AppState.blogs = res.data
  }

  async getOne(id) {
    const res = await api.get('api/blogs/' + id)
    // console.log(res)
    AppState.activeBlog = res.data
  }

  async createBlog(blogData) {
    await api.post('api/blogs', blogData)
    this.getBlogs()
  }

  async deleteBlog(id) {
    await api.delete('api/blogs/' + id)
    this.getBlogs()
  }

  // REVIEW need help with editing. Need to take the submission of new data and overwrite the old data. Both the title and the body. Form
  // do I need to include all the things that could be changed in the blogData variable? The payload needs to come in as one thing. Not two separate.
  async editBlog(blogId, updateBlog) {
    // debugger
    const blogData = updateBlog
    await api.put('api/blogs/' + blogId, blogData)
    this.getOne()
  }

  async getCommentsByBlogId(id) {
    const res = await api.get('api/blogs/' + id + '/comments')
    AppState.comments = res.data
  }

  // REVIEW need to create a comment. Right now it is passing the id for the blog it belongs to. I need the payload too.
  // how do I grab that? creating a comment is located in the modal.
  async createComment(commentData, payload) {
    logger.log('comment data', commentData)
    await api.post('api/comments/', commentData)
    this.getCommentsByBlogId()
  }

  // NOTE need delete and edit comments. First I need to get and post comments...
  async deleteComment(commentId) {
    await api.delete('api/comments/' + commentId)
    this.getCommentsByBlogId()
  }

  async editComment(commentId, newBody) {
    const commentData = { body: newBody }
    await api.put('api/comments/' + commentId, commentData)
    this.getCommentsByBlogId()
  }
}

export const blogsService = new BlogService()

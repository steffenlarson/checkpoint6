import { AppState } from '../AppState'
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
  // do I need to include all the things that could be changed in the blogData variable?
  async editBlog(blogId, newTitle) {
    const blogData = { title: newTitle }
    await api.put('api/blogs/' + blogId, blogData)
    this.getBlogs()
  }

  // REVIEW instead of grabbing all of the comments, I just need to grab the comments where the blog id property on the comment matches the current blogs id.
  // REVIEW where did we do this before? I could not find it at all.
  // I need to get comments based on the blog Id. I think I may have had things backwards. Blogs first, comments second in the search.
  // need to move the function to the blog details page. not the comment component.
  async getCommentsByBlogId(id) {
    const res = await api.get('api/blogs/' + id + '/comments')
    AppState.comments = res.data
  }

  // REVIEW need to create a comment. Do I need to pass the blog Id for it too?
  async createComment(commentData) {
    await api.post('api/comments/', commentData)
    this.getCommentsByBlogId()
  }

  // REVIEW need delete and edit comments. First I need to get and post comments...
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

import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogService {
  async getBlogs() {
    const res = await api.get('api/blogs')
    AppState.blogs = res.data
  }

  async getOne(id) {
    const res = await api.get('api/blogs/' + id)
    // console.log(res
    AppState.activeBlog = res.data
  }

  async createBlog(blogData) {
    await api.post('api/blogs', blogData)
    this.getBlogs()
  }
}

export const blogsService = new BlogService()

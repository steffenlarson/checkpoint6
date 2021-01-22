import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogService {
  async getBlogs() {
    const res = await api.get('api/blogs')
    AppState.blogs = res.data
  }

  async createBlog(blogData) {
    const res = await api.post('api/blogs', blogData)
    console.log(res)
    this.getBlogs()
  }
}

export const blogsService = new BlogService()

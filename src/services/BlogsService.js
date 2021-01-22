import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogService {
  async getBlogs() {
    const res = await api.get('api/blogs')
    AppState.blogs = res.data
  }
}

export const blogsService = new BlogService()

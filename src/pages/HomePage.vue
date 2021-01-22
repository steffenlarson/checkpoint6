<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row">
      <h1 class="my-3 bg-dark text-light p-3 rounded d-flex align-items-center">
        <span class="mx-2 text-white">The Blogs</span>
      </h1>
    </div>
    <div class="row">
      <form action="" @submit.prevent="createBlog">
        <div class="form-group">
          <label for=""></label>
          <input type="text"
                 class="form-control"
                 name="Title"
                 id="title"
                 aria-describedby="helpId"
                 placeholder="Blog Title"
                 v-model="state.newBlog.title"
          >
          <input type="text"
                 class="form-control"
                 name="Content"
                 id="body"
                 aria-describedby="helpId"
                 placeholder="Write yer blog ere mate"
                 v-model="state.newBlog.body"
          >
          <button class=" btn btn-success" type="submit">
            Submit Blog
          </button>
        </div>
      </form>
    </div>

    <div class="row">
      <BlogComponent v-for="blog in state.blogs" :key="blog.id" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { logger } from '../utils/Logger'
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      blogs: computed(() => AppState.blogs),
      newBlog: {}
    })
    onMounted(async() => {
      try {
        await blogsService.getBlogs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async createBlog() {
        try {
          await blogsService.createBlog(state.newBlog)
          state.newBlog = {}
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>

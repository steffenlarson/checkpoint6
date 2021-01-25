<template>
  <div class="BlogDetailsPage container-fluid">
    <div class="row">
      <div class="col">
        <h3>{{ activeBlog.title }}</h3>
      </div>
      <div class="col">
        <!-- REVIEW Make a form, on submit call the function editblog. Then add a toggle hide and show based on a button press.
            Need to pass the id of the blog. how do I do that? params? -->
        <!-- <button v-if="state.account.id == blogProp.creatorId" @click="editBlog"> -->
        <div class="row" v-if="state.user.isAuthenticated">
          <form action="" @submit.prevent="editBlog">
            <div class="form-group">
              <label for=""></label>
              <!-- REVIEW why are the input fields coming up as object object??? -->
              <input type="text"
                     class="form-control"
                     name="Title"
                     id="title"
                     aria-describedby="helpId"
                     placeholder="Title"
                     v-model="state.updateBlog.title"
              >
              <input type="text"
                     class="form-control"
                     name="Content"
                     id="body"
                     aria-describedby="helpId"
                     placeholder="Content"
                     v-model="state.updateBlog.body"
              >
              <button class=" btn btn-success" type="submit">
                Edit Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>{{ activeBlog.body }}</p>
      </div>
    </div>
    <div class="row">
      <CommentComponent v-for="comment in state.comments"
                        :key="comment.blog"
                        :comment-prop="comment"
      />
    </div>
    <div class="row" v-if="state.user.isAuthenticated">
      <div class="col">
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
          Add a comment
        </button>
        <QuickModal />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

export default {

  name: 'BlogDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      comments: computed(() => AppState.comments),
      // do I want a computed here???
      updateBlog: {
        title: { Type: String, required: true },
        body: { Type: String, required: true }
      },
      newComment: {},
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await blogsService.getOne(route.params.id)
        await blogsService.getCommentsByBlogId(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })

    return {
      state,
      activeBlog: computed(() => AppState.activeBlog),
      // REVIEW need help with the edits. I know that I need to overwrite the data, but I am really fuzzy on how to grab the new data and overwrite it and submit it.
      editBlog() {
        logger.log('editing the blog', state.updateBlog)
        try {
          blogsService.editBlog(this.activeBlog.id, state.updateBlog)
        } catch (error) {
          logger.error(error)
        }
      }

    }
  }

}
</script>

<style lang="scss" scoped>

</style>

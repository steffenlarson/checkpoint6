<template>
  <div class="BlogDetailsPage container-fluid">
    <div class="row">
      <div class="col">
        <h3>{{ activeBlog.title }}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>{{ activeBlog.body }}</p>
      </div>
    </div>
    <div class="row">
      <!-- REVIEW I cannot get the component to load in. Need blog in the key? nothing is appearing because nothing is in the appstate.comments -->
      <!-- Need to grab all the comments for the current blog. -->
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
    // REVIEW need to grab all of the comments that have the blog id that matches the current blog where is a good example of this?
    // onMounted(async() => {
    //   try {
    //
    //   } catch (error) {
    //     logger.error(error)
    //   }
    // })
    return {
      state,
      activeBlog: computed(() => AppState.activeBlog)
      // async createComment() {
      //   try {
      //     await blogsService.createComment(state.newComment)
      //     state.newComment = {}
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

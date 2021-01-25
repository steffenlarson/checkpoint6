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
    <div class="row comments-section">
      <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
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
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      activeBlog: computed(() => AppState.activeBlog)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

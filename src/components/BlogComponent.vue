<template>
  <div class="BlogComponent container-fluid">
    <div class="row text-center">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title title">
              <router-link :to="{name: 'BlogDetailsPage', params: {id: blogProp.id}}">
                {{ blogProp.title }}
              </router-link>
            </h4>
            <p class="card-text">
              {{ blogProp.creator.name }}
            </p>
            <button v-if="state.account.id == blogProp.creatorId" @click="deleteBlog">
              trash me
            </button>
            <button v-if="state.account.id == blogProp.creatorId" @click="state.editBlog">
              change me
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'

import { blogsService } from '../services/BlogsService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

export default {

  name: 'BlogComponent',
  props: {
    blogProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      deleteBlog() {
        try {
          blogsService.deleteBlog(props.blogProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      // REVIEW need help with the edits
      editBlog(e) {
        logger.log('editing the blog', e.target.innerText)
        try {
          blogsService.editBlog(props.blogProp.id, e.target.innerText)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.title {
  cursor: pointer;
}
</style>

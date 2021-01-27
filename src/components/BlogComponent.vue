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

            <!-- change me
            </button> -->
            <!-- </button> -->
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
      account: computed(() => AppState.account),
      blog: computed(() => props.blogProp)
    })
    return {
      state,
      deleteBlog() {
        try {
          blogsService.deleteBlog(state.blog.id)
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

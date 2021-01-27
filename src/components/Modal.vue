<template>
  <div class="QuickModal">
    <!-- Modal -->
    <div class="modal fade"
         id="modelId"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Modal form
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- REVIEW Need to also pass the parameters for the route. the Id of the blog. Need to pass the blog id (active blog) in the payload.-->
            <form class="form-inline" @submit.prevent="createComment">
              <div class="form-group">
                <input type="text"
                       name="body"
                       id="body"
                       class="form-control"
                       placeholder="Enter Comment here"
                       aria-describedby="helpId"
                       v-model="state.newComment.body"
                >
                <!-- FIXME the input somehow gets changed to a string instead of an object. -->
                <!-- <input type="text"
                       name="imgUrl"
                       id="imgUrl"
                       class="form-control"
                       placeholder="Enter img url"
                       aria-describedby="helpId"
                       v-model="state.newPost.imgUrl" -->
                >
                <button class="btn btn-success" type="submit">
                  add comment
                </button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from '../utils/Logger'
import { reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { useRoute } from 'vue-router'

export default {

  name: 'QuickModal',
  // props: {
  //   // REVIEW comment props wont work here becuase it is a sibling to comments on the blog details page?
  //   commentProp: { type: Object }
  // },
  setup() {
    const route = useRoute()
    const state = reactive({
      newComment: {
        body: '',
        blog: route.params.id
      }
    })
    return {
      state,
      async createComment() {
        try {
          await blogsService.createComment(state.newComment)
          state.newComment.body = ''
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <div class="CommentComponent container-fluid">
    <p>{{ commentProp.body }}</p>
    <div class="row">
      <button v-if="state.account.id == commentProp.creatorId" @click="deleteComment">
        Trash me
      </button>
      <!--REVIEW Save question for later... Why use state.edit comment??? Need to add a form to add new/ change content? -->
      <button v-if="state.account.id == commentProp.creatorId" @click="editComment">
        Change me
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {

  name: 'CommentComponent',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      deleteComment() {
        try {
          blogsService.deleteComment(props.commentProp.id)
        } catch (error) {
          logger.error(error)
        }
      }
      // REVIEW need help with the edits. Trying to target it by id. Need a form (2 way data binding)
      // With edits we have to pass them the id and the payload. How do I access those with props?

      // editComment() {
      //   logger.log('editing the blog', e.target.innerText)
      //   try {
      //     blogsService.editComment(props.commentProp.id, e.target.innerText)
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

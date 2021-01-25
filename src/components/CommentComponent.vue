<template>
  <div class="CommentComponent container-fluid">
    <p>THIS IS A comment</p>
    <div class="row">
      <button v-if="state.account.id == commentProp.creatorId" @click="deleteComment">
        Trash me
      </button>
      <button v-if="state.account.id == commentProp.creatorId" @click="state.editComment">
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
      },
      // REVIEW need help with the edits
      editComment(e) {
        logger.log('editing the blog', e.target.innerText)
        try {
          blogsService.editComment(props.commentProp.id, e.target.innerText)
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

</style>

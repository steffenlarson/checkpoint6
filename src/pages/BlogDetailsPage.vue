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
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { blogsService } from '../services/BlogsService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

export default {
  name: 'BlogDetailsPage',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await blogsService.getOne(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      activeBlog: computed(() => AppState.activeBlog)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

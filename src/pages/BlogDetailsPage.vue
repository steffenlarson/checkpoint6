<template>
  <div class="BlogDetailsPage container-fluid">
    <p>Welcome and hello from blog details</p>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { blogsService } from '../services/BlogsService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'

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
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

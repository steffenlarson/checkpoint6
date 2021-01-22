<template>
  <div class="BlogComponent container-fluid">
    <div class="row text-center">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              {{ blogProp.title }}
            </h4>
            <p class="card-text">
              {{ blogProp.creator.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'BlogComponent',
  props: {
    blogProp: { type: Object, required: true }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

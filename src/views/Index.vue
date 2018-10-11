<template>
  <div class="welcome-wrap">
    <div class="welcome-text">欢迎登陆管理系统！</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.welcome-wrap {
  width: 100%;
  height: 100%;
  @include flex(column, center, center);

  .welcome-text {
    font-size: $font-h3;
    color: $color-active-light;
  }
}
</style>

<template>
  <base-dialog class="base-loading" :show="visible" :title="title" :x="false">
    <div class="base-loading-icon"></div>
    <template slot="footer">
      <div class="base-loading-footer">
        <div class="base-loading-text">{{msg}}</div>
      </div>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from './BaseDialog'
export default {
  name: 'base-loading',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    msg: String
  },
  data () {
    return {
      visible: false
    }
  },
  watch: {
    show: {
      immediate: true,
      handler: function (val) {
        this.visible = val
      }
    }
  },
  methods: {
    close: function () {
      this.visible = false
    }
  },
  components: {
    BaseDialog
  }
}
</script>

<style lang="scss">
</style>

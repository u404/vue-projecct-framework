<template>
  <div class="base-dialog">
    <transition name="fade" appear>
      <div class="dialog-mask" v-show="visible"></div>
    </transition>
    <transition name="scale" appear>
      <div class="dialog-main" v-show="visible">
        <div class="dialog-header">
          <div class="dialog-title">{{title}}</div>
          <div class="dialog-close" v-if="x" @click="triggerClose"></div>
        </div>
        <div class="dialog-body">
          <slot></slot>
        </div>
        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'base-dialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    x: {
      // 右上角x号
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: false,
      onClose: null
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
    },
    triggerClose: function () {
      this.onClose && this.onClose(this.close)
      this.$emit('close', this.close)
    }
  }
}
</script>

<style lang="scss">
</style>

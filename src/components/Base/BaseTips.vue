<template>
  <div class="base-tips" @click="close();triggerClose()">
    <transition name="fade" appear>
      <div class="tips-mask" v-show="visible"></div>
    </transition>
    <transition name="scale" appear>
      <div class="tips-main" v-show="visible">
        <slot>
          <div class="tips-msg" v-html="msg"></div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'base-tips',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    msg: {
      msg: String
    },
    delay: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      visible: false,
      onClose: null,
      closeTimer: null
    }
  },
  watch: {
    show: {
      immediate: true,
      handler: function (val) {
        this.visible = val
      }
    },
    visible: {
      immediate: true,
      handler: function (val) {
        if (this.closeTimer) {
          clearTimeout(this.closeTimer)
          this.closeTimer = null
        }
        if (val) {
          this.closeTimer = setTimeout(() => {
            this.close()
            this.triggerClose()
          }, this.delay)
        }
      }
    }
  },
  methods: {
    close: function () {
      this.visible = false
    },
    triggerClose: function () {
      this.onClose && this.onClose()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
</style>

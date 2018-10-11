<template>
  <base-dialog class="base-alert-dialog" :show="visible" title="提示" :x="false">
    <div class="dialog-icon" :class="'dialog-icon-' + type"></div>
    <slot>
      <div class="dialog-msg" v-html="msg"></div>
    </slot>

    <template slot="footer">
      <div class="base-btn dialog-btn dialog-sure-btn" @click="triggerSure">
        <slot name="sure">确认</slot>
      </div>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from './BaseDialog'
export default {
  name: 'base-alert',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info'
    },
    msg: String,
    autoClose: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      onSure: null
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
    triggerSure: function () {
      this.onSure && this.onSure(this.close)
      this.$emit('sure')
      if (this.autoClose) {
        this.close()
      }
    }
  },
  components: {
    BaseDialog
  }
}
</script>

<style lang="scss">
</style>

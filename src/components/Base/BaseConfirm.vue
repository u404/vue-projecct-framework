<template>
  <base-dialog class="confirm-dialog" :show="visible" :title="title" :x="true" @close="triggerCancel">
    <slot>
      <div class="confirm-dialog-msg" v-html="msg"></div>
    </slot>
    <template slot="footer">
      <div class="base-btn base-line-btn dialog-multi-btn dialog-cancel-btn" @click="triggerCancel">
        取消
      </div>
      <div class="base-btn dialog-multi-btn dialog-sure-btn" @click="triggerSure">
        确认
      </div>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from './BaseDialog'
export default {
  name: 'base-confirm',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    msg: String,
    autoClose: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      onSure: null,
      onCancel: null
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
      this.$emit('sure', this.close)
      if (this.autoClose) {
        this.close()
      }
    },
    triggerCancel: function () {
      this.onCancel && this.onCancel(this.close)
      this.$emit('cancel', this.close)
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

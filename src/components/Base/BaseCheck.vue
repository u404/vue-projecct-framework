<template>
  <component :is="tag" class="base-check" :class="[{active: active}, (single?'base-radio':'base-checkbox')]" @click="click" :disabled="disabled">
    <i class="base-check-icon"></i>
    <slot>
      <span class="base-check-text">{{text}}</span>
    </slot>
  </component>
</template>

<script>
export default {
  name: 'base-check',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    text: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      active: false
    }
  },
  watch: {
    checked: {
      handler (val) {
        this.active = val
      },
      immediate: true
    }
  },
  methods: {
    click () {
      if (!this.disabled) {
        this.$emit('click', this.active)
      }
    }
  }
}
</script>

<style lang="scss">
.base-check {
  @include flex($jus: center);
  display: inline-flex;
  font-size: 12px;
  &:not([disabled]) {
    cursor: pointer;
  }
  &.base-radio {
    .base-check-icon {
      @include flex($jus: center);
      content: "";
      margin-right: 6px;
      width: 12px;
      height: 12px;
      border-radius: 6px;
      border: 1px solid $color-input-border;
    }
    &.active {
      .base-check-icon {
        &:before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background: $color-active;
        }
      }
    }
  }
  &.base-check {
    .base-check-icon {
      @include flex($jus: center);
      content: "";
      margin-right: 6px;
      width: 12px;
      height: 12px;
      border: 1px solid $color-input-border;
    }
    &.active {
      .base-check-icon {
        &:before {
          content: "";
          width: 6px;
          height: 6px;
          background: $color-active;
        }
      }
    }
  }
}
</style>

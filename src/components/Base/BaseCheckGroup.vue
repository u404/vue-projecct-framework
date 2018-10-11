<template>
  <ul class="base-check-group">
    <base-check tag="li" :single="single" v-for="(item,i) in list" :key="'check-' + i" :checked="indexs.indexOf(i) > -1" @click="check(i)" :disabled="disabled" :text="item.text || item.value"></base-check>
  </ul>
</template>

<script>
import BaseCheck from './BaseCheck'
export default {
  name: 'base-check-group',
  props: {
    list: {
      type: Array,
      required: true,
      validator: arr => {
        return arr.every(item => {
          return Object.prototype.hasOwnProperty.call(item, 'value')
        })
      }
    },
    checkedValue: {
      default: null
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
      indexs: []
    }
  },
  watch: {
    checkedValue: {
      handler (val) {
        if (Array.isArray(val)) {
          this.indexs = val.map(v => {
            return this.list.findIndex(item => {
              if (item.value === val) {
                return true
              }
            })
          })
        } else {
          let index = this.list.findIndex(item => {
            if (item.value === val) {
              return true
            }
          })
          if (index >= 0) {
            this.indexs = [index]
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    check (index) {
      if (!this.disabled) {
        if (this.single) {
          this.indexs = [index]
        } else {
          var i = this.indexs.indexOf(index)
          if (i > -1) {
            this.indexs.splice(i, 1)
          } else {
            this.indexs.push(i)
          }
        }
        console.log(this.getCheckedData())
        this.$emit('change', this.getCheckedData())
      }
    },
    getCheckedData () {
      if (this.single) {
        return this.list[this.indexs[0]] // 对于单选按钮组 返回{text,value}
      }
      return this.indexs.map(index => {
        return this.list[index] // 对于多选按钮组 返回[{text,value},{text,value},...]
      })
    }
  },
  components: {
    BaseCheck
  }
}
</script>

<style lang="scss">
.base-check-group {
  @include flex($jus: flex-start);
  .base-check {
    margin-right: 14px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

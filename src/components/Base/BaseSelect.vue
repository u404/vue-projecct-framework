<template>
  <select class="base-select" v-model="value" @change="$emit('change', value)">
    <option value="">{{placeholder}}</option>
    <option :value="setItemValue(item)" v-for="(item, index) in options" :key="'select-option-' + index">{{setItemText(item)}}</option>
  </select>
</template>
<script>
export default {
  name: 'base-select',
  props: {
    options: {
      type: Array | Number,
      required: true
    },
    baseNumber: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    selected: {
      type: String | Number,
      default: ''
    }
  },

  data () {
    return {
      value: ''
    }
  },
  watch: {
    selected: {
      immediate: true,
      handler (val) {
        this.value = val
      }
    }
  },
  computed: {
    setItemValue () {
      if (typeof this.options === 'number') {
        return item => item + this.baseNumber
      } else {
        return item => item.value
      }
    },
    setItemText () {
      if (typeof this.options === 'number') {
        return item => item + this.baseNumber
      } else {
        return item => item.text
      }
    }
  },
  methods: {}
}
</script>

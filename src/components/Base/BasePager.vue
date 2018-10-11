<template>
  <div class="base-pager" v-if="display">
    <ul class="pager-list">
      <li class="pager prev" @click="goPrev"></li>
      <li class="pager num" :class="{active: (i + visibleLimit.base) === current}" v-for="i in visibleLimit.size" :key="'pager-' + i" @click="goPage(i + visibleLimit.base)">{{i + visibleLimit.base}}</li>
      <li class="pager next" @click="goNext"></li>
    </ul>
    <div class="quick-jump-box">
      <span>快速跳到</span>
      <input type="number" class="base-input pager-input" v-model.number="inputPage" @keypress.enter="goPage(inputPage)" />
      <span>页</span>
      <button class="base-btn pager-go-btn" @click="goPage(inputPage)">Go</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-pager',
  props: {
    count: {
      type: Number,
      default: 0
    },
    default: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      inputPage: 0,
      current: 0
    }
  },
  computed: {
    display () {
      return this.count > 1
    },
    visibleLimit () {
      if (!this.display) {
        return null
      }
      let size = this.size < this.count ? this.size : this.count
      let leftNum = Math.ceil((size - 1) / 2)
      let rightNum = Math.floor((size - 1) / 2)
      let base = this.current - leftNum - 1
      if (base < 0) {
        base = 0
      } else if (this.count - this.current < rightNum) {
        base = this.count - size
      }
      return {
        base,
        size
      }
    }
  },
  watch: {
    default: {
      handler (page) {
        this.goPage(page, true)
        this.updateInputPage()
      },
      immediate: true
    },
    count: {
      handler (page) {
        this.updateInputPage()
      },
      immediate: true
    },
    current: {
      handler (page, oldPage) {
        this.updateInputPage()
        this.$emit('pagechange', page, oldPage)
      },
      immediate: false
    }
  },
  methods: {
    updateInputPage () {
      if (this.current === this.count) {
        this.inputPage = 1
      } else {
        this.inputPage = this.current + 1
      }
    },
    goNext () {
      if (this.current < this.count) {
        this.current++
      }
    },
    goPrev () {
      if (this.current > 1) {
        this.current--
      }
    },
    goPage (page, errorToFirst) {
      if (typeof page === 'number' && page > 0 && page < this.count + 1) {
        this.current = page
        return
      }
      if (errorToFirst) {
        this.current = 1
      }
    },
    reset (forceChange) {
      if (forceChange && this.current === this.default) {
        this.$emit('pagechange', this.current, this.current)
      } else {
        this.goPage(this.default, true)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss">
</style>

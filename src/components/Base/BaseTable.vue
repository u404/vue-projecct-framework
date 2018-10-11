<template>
  <div class="base-table-box">
    <div class="base-header-table-box" ref="headerBox">
      <table class="base-table base-header-table" :class="tableClass" ref="headerTable">
        <tr>
          <slot name="header" :index="0"></slot>
          <!--由于 滚动需要，header被使用了两次，所以，插入slot时，必须指定slot-scope，否则会报出警告-->
        </tr>
      </table>
    </div>

    <div class="base-body-table-box" ref="bodyBox" @scroll.passive="onScroll">
      <table class="base-table base-body-table" :class="tableClass" ref="bodyTable">
        <tr>
          <slot name="header" :index="1"></slot>
        </tr>
        <tr v-for="(item,index) in list" :key="'table-row-' + index">
          <slot :item="item" :index="index"></slot>
        </tr>
      </table>
    </div>

  </div>

</template>

<script>
import utils from '@/assets/scripts/utils'
export default {
  name: 'base-table',
  props: {
    list: {
      type: Array,
      default: []
    },
    tableClass: {
      type: String | Object | Array,
      default: null
    },
    triggerOffset: {
      type: Number,
      default: 80
    }
  },
  data () {
    return {}
  },
  updated () {
    this.autoSetHeaderPadding('updated')
  },
  // watch: {
  //   list: {
  //     handler () {
  //       this.$nextTick(() => {
  //         this.autoSetHeaderPadding('list')
  //       })
  //     },
  //     immediate: true
  //   },
  //   maxHeight: {
  //     handler () {
  //       this.$nextTick(() => {
  //         this.autoSetHeaderPadding('maxHeight')
  //       })
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    onScroll (e) {
      let scrollBottom =
        e.target.scrollHeight - e.target.offsetHeight - e.target.scrollTop

      if (scrollBottom < this.triggerOffset) {
        this.triggerScrollBottom()
      }
    },
    triggerScrollBottom: (function () {
      return utils.throttle(function () {
        // 节流方式触发事件
        console.log('滚动到底部了，触发事件')
        this.$emit('scrollbottom')
      }, 300)
    })(),
    autoSetHeaderPadding (msg) {
      let scrollWidth =
        this.$refs.headerTable.offsetWidth - this.$refs.bodyTable.offsetWidth

      this.$refs.headerBox.style.paddingRight =
        +this.$refs.headerBox.style.paddingRight.replace('px', '') +
        scrollWidth +
        'px'
    }
  }
}
</script>

<style lang="scss">
</style>

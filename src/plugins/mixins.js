import axios from 'axios'
const install = function (Vue, options) {
  Vue.mixin({
    created () {
      if (this.config) {
        axios.get('resources/data/' + this.config).then((res) => {
          this.config = res.data
        })
      }
    }
  })
}

export default {
  install
}

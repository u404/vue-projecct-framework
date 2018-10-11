import BaseDialog from '../components/Base/BaseDialog'
import BaseAlert from '../components/Base/BaseAlert'
import BaseConfirm from '../components/Base/BaseConfirm'
import BasePager from '../components/Base/BasePager'
import BaseCheck from '../components/Base/BaseCheck'
import BaseCheckGroup from '../components/Base/BaseCheckGroup'
import BaseTips from '../components/Base/BaseTips'
import BaseTable from '../components/Base/BaseTable'
import BaseLoading from '../components/Base/BaseLoading'
import BaseSelect from '../components/Base/BaseSelect'

const install = function (Vue, options) {
  Vue.component(BaseDialog.name, BaseDialog)
  Vue.component(BaseAlert.name, BaseAlert)
  Vue.component(BaseConfirm.name, BaseConfirm)
  Vue.component(BaseTips.name, BaseTips)
  Vue.component(BasePager.name, BasePager)
  Vue.component(BaseCheck.name, BaseCheck)
  Vue.component(BaseCheckGroup.name, BaseCheckGroup)
  Vue.component(BaseTable.name, BaseTable)
  Vue.component(BaseLoading.name, BaseLoading)
  Vue.component(BaseSelect.name, BaseSelect)
}

export default {
  install
}

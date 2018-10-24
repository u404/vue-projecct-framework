<template>
  <div class="red-packet-wrap" @touchstart="showHelpTips" @mousedown="showHelpTips" @touchmove="showHelpTips" @mousemove="showHelpTips" @touchend="showHelpTips" @mouseup="showHelpTips">
    <div class="wrap-bg" :style="{'background-image': 'url('+coupon.filmPosterUrl+')'}"></div>
    <div class="wrap-body">
      <!-- <div class="source-from" style="background-image: url(/resources/img/pic_star@2x.png)">
        <i class="avator"></i>
        <div class="info-box">
          <span class="user-name">樱木花道</span>
          <div class="tips-text">送您一个影院红包</div>
        </div>
      </div> -->
      <img class="source-from" :src="coupon.headMarkUrl" alt="">
      <div class="red-packet-box">
        <div class="box-inner ticket-box" :style="{'background-image': 'url(' + coupon.backgroundColor + ')'}">
          <div class="ticket-box-top">
            <div class="amount-text-box">
              <div v-if="!isFreeCoupon" class="amount-text" :style="{'-webkit-transform': 'scale(' + priceTextScale + ')', 'transform': 'scale(' + priceTextScale + ')'}">{{coupon.couponPrice}}</div>
              <div v-if="isFreeCoupon" class="amount-text no-rmb-symbol" style="-webkit-transform: scale(0.7); transform: scale(0.7)">兑换</div>
            </div>
            <div class="info-box">
              <div class="ticket-title">{{coupon.redPacketName}}</div>
              <div class="ticket-desc">{{coupon.remarks}}</div>
            </div>
          </div>
          <div class="movie-cover" :style="{'background-image': 'url('+coupon.filmPosterUrl+')'}"></div>
        </div>
        <div class="box-outer">
          <img v-if="coupon.cornerMarkUrl" class="label-img" :src="coupon.cornerMarkUrl" alt="">
          <div class="red-packet-title">恭喜你获得一个立减红包</div>
          <div class="btn receive-btn" @click="showReceiveDialog">马上领取</div>
        </div>
      </div>
      <div class="help-box">
        <div class="slidedown-tips" v-show="!showHelp"></div>
        <div class="desc-box" v-show="showHelp">
          <div class="desc-title"><span class="desc-title-text">领用说明</span></div>
          <div class="desc-content" v-html="coupon.activityRule"></div>
          <i class="bottom-logo"></i>
        </div>
      </div>
    </div>
    <base-dialog class="receive-dialog" :show="receiveDialogDisplay" :x="true" @close="receiveDialogDisplay=false">
      <div class="dialog-title">
        <i class="icon icon-red-packet"></i>
        <span>{{phone?'已绑定手机号':'手机号领取红包'}}</span>
      </div>
      <div class="control-list bind-receive-box" v-if="!phone">
        <div class="control-item">
          <input type="text" placeholder="手机号（限领一张）" v-model="inputPhone" />
        </div>
        <div class="control-item" v-if="needValidCode">
          <input type="text" placeholder="图形验证码" v-model="inputValidCode" />
          <img class="btn valid-img" :src="validImgSrc" alt="" @click="refreshValidImg">
        </div>
        <div class="control-item">
          <input type="text" placeholder="短信验证码" v-model="inputSmsCode" />
          <button class="btn sms-btn" v-show="!sendSmsCountDownSecond" @click="sendSmsCode">{{ sendSmsCountDownStarted?'重新获取':'获取验证码'}}</button>
          <button class="btn sms-btn disalbed" v-show="sendSmsCountDownSecond">{{sendSmsCountDownSecond}}s</button>
        </div>
        <div class="btn btn-main receive-btn" @click="recieveCouponByPhone">立即领取</div>
      </div>
      <template v-if="phone">
        <div class="dialog-tips">{{(phone+'').replace(/^(\d{3})\d{5}(\d{3})$/, "$1*****$2")}}</div>
        <div class="btn btn-main receive-btn" @click="recieveCoupon">立即领取</div>
        <div class="btn unbind-btn" @click="unbindUserPhone">解除绑定></div>
      </template>

    </base-dialog>
    <base-dialog class="receive-dialog" :show="receiveFailDialogDisplay" :x="true" @close="receiveFailDialogDisplay=false">
      <div class="dialog-title">
        <i class="icon icon-red-packet"></i>
        <span>手机号领取红包</span>
      </div>
      <div class="dialog-tips">{{receiveFailText}}</div>
      <div class="btn btn-main" @click="goAppDownload">进移动电影院看看</div>
    </base-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bezierEasing from 'bezier-easing'
export default {
  data () {
    return {
      inputPhone: '',
      inputValidCode: '',
      inputSmsCode: '',
      sendSmsTimes: -1,
      sendSmsCountDownTimer: null,
      sendSmsCountDownSecond: 0,
      sendSmsCountDownStarted: false,
      validImgSrc: '',
      needValidCode: false,
      showHelp: false,
      receiveDialogDisplay: false,
      receiveFailText: '',
      receiveFailDialogDisplay: false,
      refreshImgLoading: false,
      sendSmsLoading: false,
      controlDisabled: false
    }
  },
  computed: {
    ...mapState({
      coupon: state => state.redPacket.coupon,
      phone: state => state.user.phone,
      openid: state => state.user.openid,
      code: state => state.user.code
    }),
    priceTextScale () {
      return 4 / (2 + (this.coupon.couponPrice + '').length)
    },
    isFreeCoupon () {
      return +this.coupon.couponType === 0
    }
  },
  mounted () {
    document.title = this.coupon.webchatMainHead
    this.validateCoupon()
  },
  methods: {
    showHelpTips: (function () {
      let startY = 0
      let isEventing = false
      const distance = 10
      let timer = null
      const animateTime = 300
      const timespan = 10
      let easing = bezierEasing(0, 0, 1, 0.5)
      const isEventStart = (e) => {
        return e.type === 'touchstart' || e.type === 'mousedown'
      }
      const isEventEnd = (e) => {
        return e.type === 'touchend' || e.type === 'mouseup'
      }
      const getEventY = (e) => {
        if (e instanceof TouchEvent) {
          return e.touches[0].clientY
        } else {
          return e.clientY
        }
      }
      const scrollTo = (scrollTop) => {
        document.documentElement.scrollTop = scrollTop
        document.body.scrollTop = scrollTop
      }

      return function (e, isStart) {
        if (this.showHelp) {
          return
        }
        if (isEventStart(e)) {
          startY = getEventY(e)
          isEventing = true
        } else if (isEventing) {
          if (isEventEnd(e)) {
            isEventing = false
            return
          }

          if (getEventY(e) - startY < -distance) {
            this.showHelp = true
            this.$nextTick(() => {
              let scrollLength = document.body.scrollHeight - document.body.offsetHeight
              let times = 0
              timer && clearInterval(timer) && (timer = null)
              timer = setInterval(() => {
                times++
                let scrollTop = easing(times * timespan / animateTime) * scrollLength
                requestAnimationFrame(() => {
                  scrollTo(scrollTop)
                  // this.log('t', parseInt(scrollTop), 'docT', window.scrollTop, 'times', times, 'len', scrollLength)
                  if (scrollTop === scrollLength) {
                    timer && clearInterval(timer) && (timer = null)
                  }
                })
              }, timespan)
            })
          }
        }
      }
    }()),
    validateInputPhone () {
      if (!this.inputPhone) {
        this.$tips({msg: '请输入手机号'})
        return false
      }
      var phone = this.inputPhone.trim()
      if (/^1[^2460]\d{9}$/.test(phone)) {
        this.inputPhone = phone
        return true
      } else {
        this.$tips({msg: '手机号输入有误'})
        return false
      }
    },
    validateInputValidCode () {
      if (this.needValidCode) {
        if (!this.inputValidCode) {
          this.$tips({msg: '请输入图形验证码'})
          return false
        }
        if (/^[0-9a-zA-Z]{4}$/.test(this.inputValidCode)) {
          return true
        } else {
          this.$tips({msg: '图形验证码输入有误'})
          return false
        }
      }
      return true
    },
    validateInputSmsCode () {
      if (!this.inputSmsCode) {
        this.$tips({msg: '请输入短信验证码'})
        return false
      }
      if (/^[0-9]{4}$/.test(this.inputSmsCode)) {
        return true
      } else {
        this.$tips({msg: '短信验证码输入有误'})
        return false
      }
    },
    startSendSmsCountDown () {
      if (this.sendSmsCountDownTimer) {
        clearInterval(this.sendSmsCountDownTimer)
        this.sendSmsCountDownTimer = null
      }
      this.sendSmsCountDownSecond = 60
      this.sendSmsCountDownStarted = true
      this.sendSmsCountDownTimer = setInterval(() => {
        this.sendSmsCountDownSecond--
        if (this.sendSmsCountDownSecond === 0) {
          clearInterval(this.sendSmsCountDownTimer)
          this.sendSmsCountDownTimer = null
        }
      }, 1000)
    },
    refreshValidImg () {
      if (this.controlDisabled) return
      if (this.refreshImgLoading) return
      this.refreshImgLoading = true
      this.$services.user.getVerifImg().then(res => {
        var img = new Image()
        img.onload = () => {
          this.validImgSrc = img.src
        }
        img.src = res.data.code_image
        this.refreshImgLoading = false
      }).catch(err => {
        console.log(err)
        this.$tips({msg: err.msg})
        this.refreshImgLoading = false
      })
    },
    checkSendSmsTimes () {
      const checkNeedValidCode = () => {
        if (this.sendSmsTimes >= this.$config.sendSmsTimesLimit) {
          if (!this.needValidCode) {
            this.$tips({msg: '请输入图形验证码'})
            this.needValidCode = true
            this.refreshValidImg()
          }
        } else {
          this.needValidCode = false
        }
      }
      return new Promise((resolve, reject) => {
        console.log(this.sendSmsTimes)
        if (this.sendSmsTimes > -1) {
          checkNeedValidCode()
          resolve()
        } else {
          this.$services.user.getSendSMSTimes({mobile: this.inputPhone}).then(res => {
            this.sendSmsTimes = +res.data.send_num
            checkNeedValidCode()
            resolve()
          }).catch(() => {
            this.sendSmsTimes = 5
            checkNeedValidCode()
            resolve()
          })
        }
      })
    },
    sendSmsCode () {
      if (this.controlDisabled) return
      // 输入手机号后，调用查询接口，查询短信验证码的发送次数
      // 点击发送按钮，未输入手机号或手机号格式不正确时，需要提示请填写正确的手机号，正确时，跳转2
      // 判断是否需要图片验证码，如果需要跳转3，如果不需要跳转4
      // 检查图片验证码是否格式合法，如果不合法，那么提示请填写正确的图片验证码，如果合法那么跳转到4
      // 携带手机号（如果需要验证码，那么同时同时携带图片验证码），调用发送短信接口，如果报错那么跳转5，发送成功则显示重新发送倒计时，禁用发送按钮，倒计时结束时，重新启用
      // 提示错误信息。如果报错为需要验证码，那么将字段需要图片验证码设为true
      if (!this.validateInputPhone()) return
      if (this.sendSmsLoading) return
      this.sendSmsLoading = true
      this.checkSendSmsTimes(this.inputPhone).then(() => {
        if (!this.validateInputValidCode()) {
          this.sendSmsLoading = false
          return
        }

        this.$services.user.sendSMSCode({mobile: this.inputPhone, word: this.inputValidCode}).then(res => {
          this.startSendSmsCountDown()
          this.sendSmsTimes++
          this.sendSmsLoading = false
          if (this.sendSmsTimes > 5) {
            this.refreshValidImg()
          }
        }).catch(err => {
          this.$tips({msg: err.msg})
          this.sendSmsLoading = false
        })
      }).catch(err => {
        console.log(err)
        this.$tips({msg: err.msg})
        this.sendSmsLoading = false
      })
    },
    unbindUserPhone () {
      // 伪解除，只有重新绑定手机才会真的覆盖绑定
      this.$store.commit('userUpdate', {
        phone: ''
      })
    },
    recieveCoupon () {
      if (this.controlDisabled) return
      this.$services.redPacket.recieveCoupon({
        getcode: this.coupon.couponCode,
        send_type: 1
      }).then(res => {
        this.$store.commit('couponUpdate', {
          ...this.coupon,
          isReceive: 1
        })
        this.$router.replace({name: 'Success', query: this.$route.query})
      }).catch(err => {
        this.$tips({msg: err.msg})
      })
    },
    recieveCouponByPhone () {
      if (this.controlDisabled) return
      if (!this.validateInputPhone()) return
      if (!this.validateInputSmsCode()) return

      this.$services.redPacket.recieveCouponByPhone({
        code: this.code || undefined,
        mobile: this.inputPhone,
        mobile_code: this.inputSmsCode,
        getcode: this.coupon.couponCode
      }).then(res => {
        this.$store.commit('userUpdate', {
          phone: this.inputPhone
        })
        this.$store.commit('couponUpdate', {
          ...this.coupon,
          isReceive: 1
        })
        this.$services.redPacket.setLocalCouponRecord({
          couponCode: this.coupon.couponCode,
          phone: this.inputPhone
        })
        this.$router.replace({name: 'Success', query: this.$route.query})
      }).catch(err => {
        this.$tips({msg: err.msg})
      })
    },
    showReceiveDialog () {
      if (this.controlDisabled) {
        this.showReceiveFail()
        return
      }
      this.receiveDialogDisplay = true
    },
    showReceiveFail (msg) {
      msg && (this.receiveFailText = msg)
      this.receiveFailDialogDisplay = true
    },
    checkCouponNum () {
      if (this.coupon.surplusNum < 1) {
        this.showReceiveFail('红包已被领完了')
        return false
      }
      return true
    },
    checkCouponStatus () {
      console.log(this.coupon.activityStatus)
      switch (+this.coupon.activityStatus) {
        case 0: return true
        case 8: this.showReceiveFail('红包已被领完了'); return false
        case 3: this.showReceiveFail('该活动已下线'); return false
        case 4: this.showReceiveFail('该活动已过期'); return false
        default: this.showReceiveFail('红包设置错误'); return false
      }
    },
    validateCoupon () {
      if (this.checkCouponStatus() && this.checkCouponNum()) {
        this.controlDisabled = false
        return true
      }
      this.controlDisabled = true
      return false
    },
    goAppDownload () {
      location.href = this.$config.appDownloadLink
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped src="./Index.scss">
</style>

import Mock from 'mockjs'

Mock.setup({
  timeout: '10-3000'
})
Mock.mock(/\/coupon\/details/,
  () => ({"code":0,"msg":"success","data":{"id":3,"remarks":"仅限《一出好戏》影片可用 | 不可叠加使用","couponPrice":"20.01","couponSum":10,"surplusNum":10,"couponType":0,"discountType":1,"activityStatus":0,"activityRule":"1.每个手机号限领一张电影票。赠票被领取后，所有权将从赠票方转至领票方。<br><br>\n2.未注册过\"移动电影院\"的用户，领票后，应先下载\"移动电影院\"App，以领票手机号完成注册，即可在App的\"放映\"区看到该赠票，并可开始观影。<br><br>\n3.已注册过\"移动电影院\"的用户，建议使用注册手机号领票。领取赠票后，可在App的\"放映\"区看到该赠票，并可开始观影。<br><br>\n4.领票成功后，应在\"移动电影院\"影片上映期内完成观影。影片下线后，将无法再观影。<br><br>\n","filmBriefIntro":"黄渤导演处女作精彩纷呈","cornerMarkUrl":"http://smart-dev-java-1255596649.cos.ap-beijing.myqcloud.com/20181018/QBK9QNII.png","headMarkUrl":"http://smart-dev-java-1255596649.cos.ap-beijing.myqcloud.com/20181018/ADH6LLUA.png","filmPosterUrl":"http://smart-dev-java-1255596649.cos.ap-beijing.myqcloud.com/20181018/GCSETABV.jpeg","filmPreviewUrl":"影片预告","webchatMainHead":"1","webchatSubHead":"1","icon":"1","backgroundColor":"http://smart-dev-java-1255596649.cos.ap-beijing.myqcloud.com/20181018/3ZZNX5JC.png","redPacketName":"一出好戏电影票立减20元","displayName":"1","unplayableTime":"60","isReceive":0}}) // eslint-disable-line
)

<script>
	export default {
		globalData: {
			systemInfo: {},
			userInfo: {},
			appLoadStatus: 1, // 1 正常 0 未登录
			isIpx: false,
		},
		onLaunch: function() {
			//隐藏系统tab自定义
			uni.hideTabBar();
						
			//当前用户信息
			var userInfo = uni.getStorageSync("userInfo") || {}
			this.$scope.globalData.userInfo = userInfo;
			
			console.log('App Launch')
		},
		onShow: function() {
			this.getUpdate();
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			getUpdate: function(){
				if(uni.canIUse("getUpdateManager")) {
					const updateManager = uni.getUpdateManager();
					updateManager.onCheckForUpdate(function (res) {
						res.hasUpdate && (updateManager.onUpdateReady(function () {
							uni.showModal({
								title: "更新提示",
								content: "新版本已经准备好，是否马上重启小程序？",
								success: function (t) {
									t.confirm && updateManager.applyUpdate();
								}
							});
						}), updateManager.onUpdateFailed(function () {
							uni.showModal({
								title: "已经有新版本了哟~",
								content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
							});
						}));
					});
				}else{
					uni.showModal({
						title: "提示",
						content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>

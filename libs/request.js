import Fly from 'flyio/dist/npm/wx'

const request = new Fly()

request.config.timeout = 10000 //设置超时
request.config.parseJson = true
request.config.baseURL = API_HOST //填写域名

const errorPrompt = (err) => {
	
	uni.showToast({
		title: err.message || 'fetch data error.',
		icon: 'none'
	})

}

// 添加请求拦截器
request.interceptors.request.use(request => {
	
    // 给所有请求添加自定义header

    let accessToken = uni.getStorageSync('access_token') || ''
    if (accessToken) {
		request.headers["Authorization"] = `Bearer ${accessToken}`
    }

	//api请求版本 
	//小程序 版本
	//#ifdef MP-WEIXIN
		request.headers["Accept"] = 'application/vnd.mini_o2o.v1+json'
	//#endif
	
    /*清除空值*/
    request.body && Object.keys(request.body).forEach((val) => {
        if (request.body[val] === '') {
            delete request.body[val]
        }
    })

    request.body = {
        ...request.body
    }

    return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
request.interceptors.response.use(
(response, promise) => {
  // 错误提示
  	if(response.status === 200 || response.status === 201){
    	//只将请求结果的data字段返回

    	return promise.resolve(response.data)
		
  	}  else{
		
	    uni.showToast({
			title: '出错啦！请稍后再试试哦～',
			icon: 'none',
			duration: 2000
	    })
  	}
}, (err, promise) => {

	errorPrompt(err)
	return promise.reject(err)
})

export default request

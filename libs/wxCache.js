var dtime = '_deadtime';

/**
 * [description]
 * @param  {[type]} key   [description]
 * @param  {[type]} value [description]
 * @param  {[type]} time  [description]
 * @return {[type]}       [description]
 */
const put = function(key, value, time) {
    uni.setStorageSync(key, value)

    var seconds = parseInt(time)

    if (seconds > 0) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000 + seconds;
        uni.setStorageSync(key + dtime, timestamp + "")
    } else {
        uni.removeStorageSync(key + dtime)
    }
}

/**
 * [description]
 * @param  {[type]} key [description]
 * @param  {[type]} def [description]
 * @return {[type]}     [description]
 */
const get = function(key, def) {
    var deadtime = parseInt(uni.getStorageSync(key + dtime))
    if (deadtime) {
        if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
            if (def) {
                return def;
            } else {
                return;
            }
        }
    }

    var res = uni.getStorageSync(key);

    if (res) {
        return res;
    } else {
        return def;
    }
}

/**
 * [description] 清除指定key
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
const remove = function(key){
    uni.removeStorageSync(key);
    uni.removeStorageSync(key + dtime);
}

/**
 * [description] 清理本地数据缓存
 * @return {[type]} [description]
 */
const clear = function(){
    uni.clearStorageSync();
}

export default {
    put: put,
    get: get,
    remove: remove,
    clear: clear,
}

import Vue from 'vue'
import axios from 'axios'

const host_url = 'http://192.168.5.68:3000'

const request = {
  homeBanner: function (params) {
    return getMethod(host_url + '/api/bannerCon/bannerShow', params)
  },
  homeActivitylist: function (params) {
    return getMethod(host_url + '/api/travel/travelActList', params)
  },
  activityDetail: function (params) {
    Vue.$vux.loading.show({
      text: '加载中...'
    })
    return getMethod(host_url + '/api/travel/travelAct', params)
  }
}

function getMethod(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: {...params}
    }).then(res => {
      Vue.$vux.loading.hide()
      resolve(res)
    }).catch(error => {
      Vue.$vux.loading.hide()
      reject(error)
    })
  })
}

function postMethod(url, params) {

}

export default request

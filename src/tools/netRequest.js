
import axios from 'axios'
const  host_url = 'http://192.168.5.69:3000'

const request = {
  homeBanner:function (params){
    return getMethod(host_url+'/api/bannerCon/bannerShow',params)
  },
  homeActivitylist:function (params) {
    return getMethod(host_url+'/api/travel/travelActList',params)
  },
  activityDetail:function (params) {
    return getMethod(host_url+'/api/travel/travelAct',params)
  }
}
function getMethod(url,params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params:{...params}
    }).then(res => {
      resolve(res)
    }).catch(error=>{
      reject(error)
    })
  })
}
function postMethod(url,params) {

}

export default request

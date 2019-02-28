<template>
  <div class="detail" ref="detailRef">
    <mt-swipe class="banner-wrapper" :auto="4000">
      <mt-swipe-item class="banner" v-for="item in bannerList">
        <img :src="item" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <div class="headerInfo">
      <h5 class="title">{{this.activityInfo.optional.name}}</h5>
      <h5 class="price">{{this.activityInfo.optional | priceFliter}}</h5>
      <div class="line"></div>
      <div class="time">
        <span><img src="static/ico_list_activity.png" alt=""></span>
        <span class="time-lab">{{this.activityInfo.optional | timeFilter}}</span>
      </div>
      <div class="line"></div>
      <div class="time">
        <span><img src="static/ico_travel_shop.png" alt=""></span>
        <span class="time-lab">{{this.activityInfo.optional.companyName}}</span>
      </div>
      <div class="boldline" ref="boldlineRef"></div>
      <p v-if="this.activityInfo.optional.richType === 1" class="detail-title">商品介绍</p>
    </div>
    <div v-if="this.activityInfo.optional.richType === 1" class="rich-wrapper" v-html="richtext"></div>
    <div v-else class="text-wrapper">
      <activity-segment :class="{segment:true,fixed:fixedClass}"></activity-segment>
      <div class="tripRuleList">
        <div class="tripRule">
          <section class="tripRule-right" v-for="item in this.activityInfo.optional.journeyList">
            <section class="tripRule-left">
              <div class="tripline">
                <div class="circle"></div>
                <div class="line"></div>
                <div class="circle"></div>
              </div>
            </section>
            <div class="liWrapper">
              <li v-for="(title,index) in tripTitles">
                <img :src="tripImgs[index]" alt="">
                <div class="titleInfo">
                  <p>{{title}}</p>
                  <span v-if="index === 0">{{item.time}}</span>
                  <span v-else-if="index === 1">{{item.place}}</span>
                  <span v-else-if="index === 2">{{item.vehicle}}</span>
                  <span v-else-if="index === 3">{{item.stay}}</span>
                  <span v-else-if="index === 4">{{item.food}}</span>
                  <span v-else>{{item.content}}</span>
                </div>
              </li>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Swipe, SwipeItem} from 'mint-ui';
  import gallery from 'img-vuer'
  import Vue from 'vue'
  import tool from '@/tools/tool.js'
  import netrequest from '@/tools/netRequest.js'
  import activitySegment from './activitycomponents/activitySegment'

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.use(gallery, {
    swipeThreshold: 150  // default 100
  })
  export default {
    name: "ActivityDetail",
    data() {
      return {
        tripTitles: ['集合时间:', '集合地点:', '交通工具:', '住宿:', '餐饮:', '活动内容:'],
        tripImgs: ['static/activity/ico_details_time.png',
          'static/activity/ico_details_coord.png',
          'static/activity/ico_details_traffic.png',
          'static/activity/ico_details_stay.png',
          'static/activity/ico_details_food.png',
          'static/activity/ico_details_active.png'],
        bannerList: [],
        richtext: '',
        activityInfo: {},
        segmentTop: 0,
        fixedClass: false,
      }
    },
    components: {
      activitySegment
    },
    beforeCreate() {
      if (!this.$route.query.id) {
        this.$router.push({
          name: 'homeRt'
        })
      }
    },
    beforeMount() {
      this.loadData()
    },
    mounted() {
      document.addEventListener('scroll', this.windscroll)
    },
    updated() {
      if (this.segmentTop === 0) {
        this.segmentTop = this.$refs.boldlineRef.getBoundingClientRect().bottom
      }
    },
    methods: {
      loadData() {
        netrequest.activityDetail({
          id: this.$route.query.id
        }).then(res => {
          this.activityInfo = res.data
          this.richtext = this.activityInfo.optional.richText
          this.bannerList = this.activityInfo.optional.imgList
        })
      },
      windscroll() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop >= this.segmentTop) {
          this.fixedClass = true
        } else if (scrollTop < this.segmentTop) {
          this.fixedClass = false
        }
      }
    },
    beforeDestroy() {
      document.removeEventListener('scroll', this.windscroll)
    },
    filters: {
      priceFliter: function (item) {
        var adult
        var child
        if (item.priceAdult) {
          adult = tool.float2f(item.priceAdult)
        }
        if (item.priceChild) {
          child = tool.float2f(item.priceChild)
        }
        if (adult && child) {
          if (adult > child) {
            return '¥' + child + '-' + '¥' + adult + '/人'
          } else {
            return '¥' + adult + '-' + '¥' + child + '/人'
          }
        } else if (adult && !child) {
          return '¥' + adult + '/人'
        } else if (!adult && child) {
          return '¥' + child + '/人'
        }
      },
      timeFilter: function (item) {
        let startTime = item.applyStarTime.substring(0, 10)
        let endTime = item.applyEndTime.substring(0, 10)
        return startTime.replace(/-/g, '.') + '-' + endTime.replace(/-/g, '.')
      },
    }
  }

</script>

<style scoped>
  /*<!--这里要使用原生css和>>>才能是v-html里面的样式生效-->*/
  .detail .banner-wrapper {
    width: 100%;
    height: 56vw;
  }

  .detail .banner-wrapper .banner img {
    width: 100%;
    height: 100%;
    background-size: cover;
  }

  .detail .headerInfo {
    padding: 10px;
    padding-bottom: 0;
  }

  .detail .headerInfo .title {
    font-size: 16px;
  }

  .detail .headerInfo .price {
    font-size: 14px;
    color: red;
  }

  .detail .headerInfo .line {
    padding: 5px 0;
  }

  .detail .headerInfo .line::after {
    content: '';
    display: block;
    height: 1px;
    background-color: #cccccc;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }

  .detail .headerInfo .time {
    padding-top: 3px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .detail .headerInfo .time .time-lab {
    font-size: 12px;
    padding-left: 8px;
  }

  .detail .headerInfo .time span img {
    width: 15px;
  }

  .detail .headerInfo .boldline {
    height: 5px;
    background: #eee;
    margin-left: -10px;
    margin-right: -10px;
    margin-top: 5px;
  }

  .detail .headerInfo .detail-title {
    font-size: 15px;
    text-align: center;
    padding-top: 10px;
  }

  .detail .rich-wrapper {
    width: 100vw;
    word-wrap: break-word;
    position: relative;
  }

  .detail .rich-wrapper >>> img {
    width: 100%;
  }

  .detail .text-wrapper .segment.fixed {
    position: fixed;
    left: 0;
    top: 0;
  }

  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right {
    padding-bottom: 50px;
    display: flex;
    justify-content: start;
    align-items: start;
  }

  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right .tripRule-left {
    flex-basis: 70px;
    flex-shrink: 1;
    align-self: stretch;
    position: relative;
  }

  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right .tripRule-left .tripline {
    width: 5px;
    height: 100%;
    position: absolute;
    right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right .tripRule-left .tripline  .circle:first-child{
    background: #ccc;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-top: 10px;
  }
  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right .tripRule-left .tripline  .line {
    width: 1px;
    flex-grow: 1;
    background: #ccc;
  }
  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right .tripRule-left .tripline  .circle:last-child{
    background: #ccc;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right .liWrapper {
    flex-basis: 275px;
    flex-grow: 1;
  }

  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right .liWrapper > li {
    display: flex;
    justify-content: start;
    align-items: start;
    margin-top: 10px;
  }

  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right > .liWrapper > li > img {
    margin-top: 5px;
  }

  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right > .liWrapper > li > .titleInfo {
    margin-left: 8px;
    display: flex;
    justify-content: start;
    align-items: start;
  }

  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right > .liWrapper > li > .titleInfo p {
    font-size: 13px;
    color: #444;
    white-space: nowrap;
  }

  .detail .text-wrapper .tripRuleList .tripRule .tripRule-right > .liWrapper > li > .titleInfo span {
    font-size: 13px;
    color: #444;
    padding-left: 10px;
    padding-right: 10px;
  }

</style>

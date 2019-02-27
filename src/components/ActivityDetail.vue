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
      <activity-segment  :class="{segment:true,fixed:fixedClass}"></activity-segment>
      <div class="ruleList" style="height: 1000px"></div>
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
      if (this.segmentTop === 0){
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
        console.log(scrollTop,this.segmentTop)
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

</style>

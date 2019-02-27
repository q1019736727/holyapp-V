<template>
  <!--使用InfiniteScroll必须在外层满屏上-->
  <div class="page"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="10">
    <swiper :options="swiperOption" @someSwiperEvent="callback">
      <swiper-slide v-for="item in imgList">
        <img :src="item.imgUrl">
      </swiper-slide>
    </swiper>
    <homemenu></homemenu>
    <main class="activitylist">
      <ul class="list-wrapper">
        <li v-for="item in activityList" :key="item.id">
          <router-link :to="{name:'detail',query:{id:item.id}}">
            <span class="area">{{item | areaFilter}}</span>
            <img v-lazy="item.url" alt="">
            <h5>{{item.name}}</h5>
            <div class="bottom-info">
                <span class="left-info">
                  <h5>{{item | priceFliter}}</h5>
                  <p>{{item | timeFilter}}</p>
                </span>
              <span class="right-info">
                  <p>{{item.applyNum}}人已报名</p>
                  <h5>报名已结束</h5>
                </span>
            </div>
          </router-link>
        </li>
      </ul>

      <!--显示加载中转菊花-->
      <div class="loading-box" v-if="loading&&!noMore">
        <mt-spinner type="snake" :size="15" class="loading-more"></mt-spinner>
        <span class="loading-more-txt">加载中...</span>
      </div>

      <div class="no-more" v-if="noMore">没有更多了~</div>

    </main>
  </div>

</template>

<script>
  import Vue from 'vue'
  import homemenu from './homecomponents/homemenu'
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import {Loadmore, InfiniteScroll, Spinner, Lazyload} from 'mint-ui'
  import tool from '@/tools/tool.js'
  import netrequest from '@/tools/netRequest.js'
  import { Loading } from 'vux'

  Vue.use(InfiniteScroll, Lazyload)
  export default {
    name: "PageOne",
    data() {
      return {
        imgList: [],
        activityList: [],
        loading: false,
        noMore: false,
        pageNum: 0,
        offsetTop: "",//获取滚动位置，下次进来的时候，设置滚动高度为这个值
        swiperOption: {
          autoplay: 3000,
          speed: 1000,
          loop: true, // 循环模式选项
        }
      }
    },

    // keep-alive 两个钩子函数 activated(当前界面) deactivated(非当前界面)
    activated() {
      // keep-alive组件 页面进入的时候设置滚动高度
      document.getElementsByClassName("page")[0].scrollTop = this.offsetTop;
    },
    // deactivated() {
    //   //keep-alive 组件停用时调用（简单理解为组件离开的时候）。
    //   // 获取页面滚动高度，这个钩子有可能会拿不到数据，因为这个钩子执行的慢，可以用beforeRouteLeave代替
    //   this.offsetTop = document.getElementsByClassName("page")[0].scrollTop;
    // },
    beforeRouteLeave(to, from, next) {
      // 组件离开的时候，获取页面滚动高度
      this.offsetTop = document.getElementsByClassName('page')[0].scrollTop;
      next()
    },


    beforeMount() {
      netrequest.homeBanner({
        deviceType: 2,
        projectId: 6,
        imgType: 0,
        pixel: 750
      }).then(res => {
        this.imgList = res.data.rows
      })
    },
    methods: {
      callback(value) {

      },

      loadMore() {
        this.loading = true;
        this.loadData()
      },

      loadData() {
        netrequest.homeActivitylist({
          pageNum: this.pageNum + 1,
          pageSize: 10,
          status: 2,
          status1: 3,
          status2: 4
        }).then(res => {
          this.loading = false;
          this.pageNum = this.pageNum + 1
          if (this.activityList.length === 0) {
            this.activityList = res.data.rows
          } else {
            this.activityList = this.activityList.concat(res.data.rows)
          }
          if (res.data.rows.length < 10) {
            this.loading = true
            this.noMore = true
          }
        })
      }

    },
    mounted: function () {

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
      areaFilter: function (item) {
        let type = item.type.split(':')[0]
        switch (type) {
          case '1':
            return '周边游'
            break;
          case  '2':
            return item.actStarPlace + ' ⇋ ' + item.actEndPlace
            break;
          case '3':
            return '生活方式'
            break;
          default:
            return '周边游'
            break;
        }
      }
    },
    computed: {},
    components: {
      homemenu,
      swiper,
      swiperSlide,
      Loadmore,
      InfiniteScroll,
      Spinner,
      Lazyload,
      Loading
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/style/common.scss";

  $wid: calc(100% - 30px);
  .page {
    overflow: auto;
    height: calc(100vh - 51px);
    padding-bottom: 51px;
    .swiper-container {
      height: 230px;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .activitylist {
      // 加载中。。。
      .loading-box {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        .loading-more {
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
        .loading-more-txt {
          vertical-align: middle;
          font-size: 12px;
        }
      }

      .no-more {
        font-size: 12px;
        text-align: center;
        height: 30px;
      }

      .list-wrapper {
        li {
          padding-top: 15px;
          padding-bottom: 10px;
          position: relative;
          .area {
            position: absolute;
            left: 30px;
            margin-right: 30px;
            padding: 5px 10px;
            background: rgba(100, 100, 100, 0.5);
            color: white;
            font-size: 13px;
          }
          img {
            width: $wid;
            height: (100% * (9/16));
            border-radius: 5px;
            margin-left: 15px;
            margin-right: 15px;
            background-size: cover;
          }
          & > a > h5 {
            padding-left: 15px;
            padding-right: 15px;
          }
          .bottom-info {
            padding-left: 15px;
            padding-right: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left-info {
              & > h5 {
                color: red;
              }
              & > p {
                color: #999999;
                font-size: 12px;
              }
            }
            .right-info {
              background-color: $main_color;
              border-radius: 5px;
              padding: 2px 5px;
              p {
                font-size: 11px;
                text-align: center;
                color: #eee;
              }
              h5 {
                color: white;
              }
            }
          }
        }
      }

    }
  }
</style>

<template>
  <div class="page">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
      <swiper :options="swiperOption" @someSwiperEvent="callback">
        <swiper-slide v-for="item in imgList">
          <img :src="item.imgUrl">
        </swiper-slide>
      </swiper>
      <main class="activitylist">
        <ul class="list-wrapper">
          <li v-for="item in activityList">
            <img :src="item.url" alt="" >
            <h5>{{item.name}}</h5>
          </li>
        </ul>
      </main>
    </mt-loadmore>
  </div>

</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import {Loadmore} from 'mint-ui'
  export default {
    name: "PageOne",
    data() {
      return {
        imgList: [],
        activityList:[],
        swiperOption: {
          autoplay: 3000,
          speed: 1000,
          loop: true, // 循环模式选项
        }
      }
    },
    created() {
      this.$http.get('http://192.168.5.68:3000/api/bannerCon/bannerShow', {
        params:{
          deviceType:2,
          projectId:6,
          imgType:0,
          pixel: 750
        }
      }).then(res => {
          this.imgList = res.data.rows
        })

      this.$http.get('http://192.168.5.68:3000/api/travel/travelActList',{
        params:{
          pageNum:1,
          pageSize:10,
          status:2,
          status1:3,
          status2:4
        }
      }).then(res=>{
        this.activityList = res.data.rows
      })
    },
    methods: {
      callback(value) {

      },
      loadBottom(){
      },
      allLoaded(){

      },
      loadTop(){

      }

    },
    mounted: function () {

    },
    computed: {},
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="scss" scoped>
  $wid:calc(100% - 30px);
  .page{
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
    .activitylist{
      .list-wrapper{
        li{
          padding-top: 15px;
          img{
            width: $wid;
            height: 200px;
            padding-left: 15px;
            padding-right: 15px;
          }
          h5{
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      }

    }
  }
</style>

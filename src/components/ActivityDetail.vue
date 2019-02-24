<template>
    <div>
      <mt-swipe class="banner-wrapper" :auto="4000">
        <mt-swipe-item class="banner" v-for="item in bannerList">
          <img :src="item" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  import gallery from 'img-vuer'
  import Vue from 'vue'
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  //图片预览
  Vue.use(gallery, {
    swipeThreshold: 150  // default 100 ,new in 0.12.0
  })
  export default {
    name: "ActivityDetail",
    beforeMount(){
      this.loadData()
    },
    data(){
      return{
        bannerList:[],
      }
    },
    methods:{
        loadData(){
          this.$http.get('http://192.168.0.108:3000/api/travel/travelAct',{
            params:{
              id:this.$route.query.id
            }
          }).then(res => {
            console.log(res)
            this.bannerList = res.data.optional.imgList
          })
        }

      }
    }

</script>

<style lang="scss" scoped>
  .banner-wrapper{
    width: 100%;
    height: 56vw;
    .banner{
      img{
        width: 100%;
        height: 100%;
        background-size: cover;
      }
    }
  }
</style>

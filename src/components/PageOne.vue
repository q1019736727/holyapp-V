<template>
  <div>
    <swiper :options="swiperOption"  @someSwiperEvent="callback">
      <swiper-slide v-for="item in imgList">
        <img :src="item">
      </swiper-slide>
    </swiper>
  </div>
    
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
      name: "PageOne",
      data() {
        return {
          imgList:[
            'http://pjv07e7aa.bkt.clouddn.com/%20Memories.jpeg',
            'http://pjv07e7aa.bkt.clouddn.com/LetMeLoveYou.jpeg',
            'http://pjv07e7aa.bkt.clouddn.com/RatherBe.jpeg',
            'http://pjv07e7aa.bkt.clouddn.com/SkinTight.jpeg',
            'http://pjv07e7aa.bkt.clouddn.com/yiwai.jpeg'
          ],
          swiperOption: {
            autoplay: 3000,
            speed: 1000,
            loop: true, // 循环模式选项
          }
        }
      },
      methods:{
        callback(value){
          alert(value)
        }
      },
      mounted:function () {

      },
      computed: {
      },
      components: {
        swiper,
        swiperSlide
      }
    }
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 300px;
    img{
      display: inline-block;
      width: 100%;
      height: 100%;
      object-fit: cover;

    }
  }
</style>
